import { EventEmitter } from "events";
import Connection, { Message, MessageType, JsapiAccessProvider } from "att-websockets/dist/connection";
import { Servers } from "alta-jsapi";

export default class DashboardConnection extends EventEmitter
{
    commandEmitter;
    subscriptionEmitter;

    internal;

    serverId;

    isConnecting;
    isForbidden;
    isConnected;
    isTerminated;

    constructor(serverId)
    {
        super();

        this.serverId = serverId;

        this.commandEmitter = new EventEmitter();
        this.subscriptionEmitter = new EventEmitter();
    }


    attempt(launch = false)
    {
        if (!this.isConnected && !this.isForbidden && !this.isConnecting)
        {
            this.emit("system", "Requesting connection");

            this.isTerminated = false;
            this.isConnecting = true;
            
            Servers.joinConsole(this.serverId, launch)
            .then(details =>
            {
                var newConnection = new Connection(new JsapiAccessProvider(this.serverId, Servers), "Server Connection");
                
                newConnection.onMessage = this.handleMessage.bind(this);

                newConnection.open()
                .then(() =>
                {
                    this.internal = newConnection;

                    this.isConnected = true;

                    this.internal.onClose = this.terminate.bind(this);

                    // var subscriptions = this.subscriptionEmitter.eventNames();

                    // for (var event of subscriptions)
                    // {
                    //     console.log(event);
                    //     this.subscribe(event, undefined);
                    // }

                    this.isConnecting = false;
                    
                    this.emit("system", "Connection Succeeded");
                    this.emit("connected");
                })
                .catch(error =>
                {
                    this.emit("system", "Connection failed");
                    console.error(error);
                    this.isConnecting = false;   
                });
            })
            .catch(error =>
            {
                if (error.statusCode == 403)
                {
                    this.emit("system", "Connection forbidden");
                    this.isForbidden = true;
                }
                else
                {
                    console.error(error);
                    this.emit("system", "Connection rejected");
                }

                this.isConnecting = false;

                this.emit("failed");
            });
        }
    }

    terminate()
    {
        if (this.internal != null)
        {
            this.internal.onClose = undefined;
            this.internal.terminate();
            this.internal = null;

            this.emit("disconnected");
            this.emit("system", "Disconnected");
        }

        if (this.isConnecting)
        {
            this.emit("system", "Connecting cancelled");
        }

        var unhandledCommands = this.commandEmitter.eventNames();

        var error = {error:'Connection Lost'};

        for (var command of unhandledCommands)
        {
            this.commandEmitter.emit(command, error);
        }

        this.commandEmitter.removeAllListeners();

        this.isConnected = false;
        this.isTerminated = true;
    }

    handleMessage(data)
    {
        switch (data.type)
        {
            case MessageType.SystemMessage:
                this.emit('system', data);
                break;

            case MessageType.Subscription:
                this.subscriptionEmitter.emit(data.eventType, data);
                break;

            case MessageType.CommandResult:
                this.commandEmitter.emit('' + data.commandId, data);
                break;

            default:
                console.log("Unhandled message:");
                console.log(data);
                break;
        }
    }

    send(command)
    {
        if (!this.internal)
        {
            throw new Error("Must be connected. Check 'isConnected', or subscribe to on('connected')");
        }

        this.emit('command', command);

        return new Promise((resolve, reject) => 
        {
            var id = this.internal.send(command);

            this.commandEmitter.once('' + id, resolve);
        });
    }

    async subscribe(event, callback)
    {
        if (callback == undefined)
        {
            console.error("Cannot subscribe without a callback");
            return;
        }
     
        console.log("Subscribing to " + event);
           
        this.subscriptionEmitter.addListener(event, callback);

        var count = this.subscriptionEmitter.listenerCount(event);

        this.emit('subscriptionChanged', {event, count});
        
        if (!!this.internal)
        {
            if (count == 1)
            {
                var result = await this.send('websocket subscribe ' + event);
                result = result.data;

                if (!!result.Exception)
                {
                    console.error(`Failed to subscribe to ${event}`);
                    console.error(result.Exception);
                }
                else
                {
                    console.log(`Subscribed to ${event} : ${result.ResultString}`);
                }
            }
        }
        else
        {
            console.log(`Subscribed to ${event} : "Waiting for connection..."`);
        }

        return result;
    }

    async unsubscribe(event, callback)
    {
        var oldCount = this.subscriptionEmitter.listenerCount(event);

        this.subscriptionEmitter.removeListener(event, callback);

        var count = this.subscriptionEmitter.listenerCount(event);

        if (count == oldCount)
        {
            console.error("Trying to remove a subscription that doesn't exist");
            return;
        }
        
        console.log("Unsubscribing from " + event);

        this.emit('subscriptionChanged', {event, count});

        if (!!this.internal)
        {
            if (count == 0)
            {
                var result = await this.send('websocket unsubscribe ' + event);
                result = result.data;

                if (!!result.Exception)
                {
                    console.error(`Failed to unsubscribe from ${event}`);
                    console.error(result.Exception);
                }
                else
                {
                    console.log(`Unsubscribed from ${event} : ${result.ResultString}`);
                }
            }
        }
        else
        {
            console.log(`Unsubscribed from ${event} : "No connection"`);
        }

        return result;
    }
}