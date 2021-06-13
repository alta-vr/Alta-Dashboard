import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import moduleMap from 'dashboardModules/core/moduleMap';

import { Servers, Groups, Sessions } from 'alta-jsapi';

import DashboardConnection from './dashboardConnection';

import DashboardBase from '../../components/DashboardBase';

const originalLayouts = {
    lg: [{ i: 'o-1', x: 0, y: 0, w: 2, h: 2 }],
};

const originalDatas = {
    ['o-1']: { content: 'Template' }
}


var connection;

export function getConnection() { return connection; }

export default function ServerDashboard()
{
    var { serverId } = useParams();

    var [server, setServer] = useState(undefined);
    const [group, setGroup] = useState(undefined);
    var [error, setError] = useState(undefined);

    var [junk, setJunk] = useState(0);

    function forceUpdate()
    {
        setJunk(junk + 1);
    }

    const refreshInfo = () =>
    {        
        let isMounted = true;

        if (!!connection && connection.serverId != serverId)
        {
            connection.terminate();
            connection = null;
        }

        if (!connection)
        {
            connection = new DashboardConnection(serverId);
            
            connection.on('connected', forceUpdate);
            connection.on('disconnected', forceUpdate);
            connection.on('failed', forceUpdate);
            connection.attempt();
        }

        Servers.getDetails(serverId)
            .then(server =>
            {
                if (isMounted && server.id == serverId)
                {
                    if ((!group || group.id != server.group_id) && !!server.group_id)
                    {
                        let requestId = server.group_id;
                        
                        console.log("Getting group information");
                        Groups.getGroupInfo(server.group_id)
                            .then(result => { if (isMounted && requestId == server.group_id) { setGroup(result); } })
                            .catch(error => { if (isMounted && requestId == server.group_id) setError(error); });
                    }

                    let time = Date.parse(server.online_ping);
                    let elapsed = Date.now() - time;
                    let hasTime = elapsed < 600000;

                    console.log("Setting server information");

                    setTimeout(() => refreshRef.current()(), hasTime ? Math.max(32000 - elapsed, 5000) : 60000);
                    setServer(server);

                    if (server.online_players.length > 0)
                    {
                        connection.attempt();
                    }
                }
            })
            .catch(error => { if (isMounted) setError(error) });

        return () => 
        {
            isMounted = false;

            if (!!connection)
            {
                connection.terminate();
                connection = null;
            }
        };
    };

    const refreshRef = React.useRef(() => refreshInfo);

    useEffect(() => refreshRef.current = () => refreshInfo);

    useEffect(() =>
    {
        // setGroup(undefined);
         return refreshRef.current()();

        return () => console.log("Test");
    }, [serverId]);

    if (!!error)
    {
        return <div>{error}</div>
    }

    if (!server || (!group && !!server.group_id))
    {
        return <div>Loading...</div>;
    }

    var connectionInfo = {
        launch: () => connection.attempt(true),
        subscribe: connection.subscribe.bind(connection),
        unsubscribe: connection.unsubscribe.bind(connection),
        send: connection.send.bind(connection),
        isConnecting: connection.isConnecting,
        isForbidden: connection.isForbidden,
        isConnected: connection.isConnected,
        isTerminated: connection.isTerminated,
        useEvent: (event, callback) =>
        {
            useEffect(() =>
            {
                let cache = connection;

                cache.on(event, callback);

                return () => cache.removeListener(event, callback);
            },
            [serverId]);
        },
        useCommand: (command, callback, deps = []) =>
        {
            useEffect(() =>
            {
                console.log("Use Command : " + command);

                let cache = connection;
                let run = () => cache.send(command).then(callback);

                if (cache.isConnected)
                {
                    run();
                }
                else
                {
                    cache.on('connected', run);

                    return () => cache.removeListener('connected', run);
                }
            },
            [...deps, serverId]);
        },
        useSubscription: (event, callback) =>
        {
            useEffect(() =>
            {
                console.log("Use Subscription " + event);
                
                let cache = connection;

                cache.subscribe(event, callback);

                return () => cache.unsubscribe(event, callback);
            },
            [serverId]);
        }
    };
    
    return <DashboardBase 
        moduleMap={moduleMap}
        storageId="alta-dashboard"
        defaultLayout={originalLayouts}
        defaultData={originalDatas}
        moduleProps={{group, server, connection:connectionInfo}}/>;
}
