import React from 'react';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import { ModuleWrapper, StatHeader } from './core/common';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { TextField, Menu, Checkbox, Select, MenuItem, Grid, FormGroup, FormControlLabel, Button, Container, Toolbar, Input, InputLabel } from '@material-ui/core';
import { invoke } from 'q';
import { Autocomplete } from '@material-ui/lab';

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import MessageTable from '../components/MessageTable';

export const moduleName = 'Subscription Stream';

export const moduleSize =
{
    defaultWidth: 6,
    defaultHeight: 6,
    minWidth: 2,
    minHeight: 4,
    maxWidth: 12,
    maxHeight: 100
}

export const module = ({ box, config, onConfigChange, group, server, connection }) =>
{
    var [messages, setMessages] = React.useState([]);
    var [limit, setLimit] = React.useState(100);

    function callback(item)
    {
        setMessages(prev => 
        {
            var result = [...prev, item];

            if (result.length > limit)
            {
                return result.splice(result.length - limit, limit);
            }

            return result;
        });
    }

    function limitChanged(event)
    {
        var value = event.target.value;

        if (messages.length > value)
        {
            var result = [...messages];
            setMessages(result.splice(result.length - limit, limit));
        }

        setLimit(value);
    }

    function clear()
    {
        setMessages([]);
    }


    return <ModuleWrapper>
        <StatHeader color='info' icon='info' title={moduleName} />
        <CardBody style={{ height: '0' }}>
            {!connection.isConnected ? "Not connected..." :
                <>
                    {/* <TopBar id={id}/> */}
                    {box.w > 3 ?
                        <>
                            <Toolbar>
                                <SubscriptionBar wide connection={connection} callback={callback}/>    
                                <div style={{margin:'10px'}}>
                                    <InputLabel>
                                        Message Limit
                                    </InputLabel>
                                    <Input name='limit' inputProps={{min:0, type:'number'}} value={limit} onChange={limitChanged}/>
                                </div>
                                <Button onClick={clear}>Clear</Button>
                            </Toolbar>
                            {/* {messages.map(item => <p>{JSON.stringify(item)}</p>)} */}
                            <MessageTable messages={messages} desktop/>      
                            {/* <CommandInput id={id}/> */}
                        </> 
                        :
                        <>
                            {/* <NavigationBar options={[
                        { 
                        name: "Console",
                        content: () => <React.Fragment>
                            <MessageTable id={id}/>      
                            <CommandInput id={id}/>
                        </React.Fragment>
                        },
                        {
                        name: "Events",
                        content: () => <SubscriptionBar/>
                        },
                        {
                        name: "Modules",
                        content: () => <ModulesSidebar id={id}/>
                        }          
                        ]}/> */}
                        </>}
                </>}
        </CardBody>
        <CardFooter></CardFooter>
    </ModuleWrapper>;
};

const allLogs = [
    'TraceLog',
    'DebugLog',
    'InfoLog',
    'WarnLog',
    'ErrorLog',
    'FatalLog',
];

const hiddenEvents = ['OffLog', 'None'];

const hiddenAndLogEvents = [ ...hiddenEvents];

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function SubscriptionBar({ wide, connection, callback })
{
    const [events, setEvents] = React.useState([]);
    const [subscriptions, setSubscriptions] = React.useState([]);

    connection.useCommand('websocket subscriptions', result => setEvents(result.data.Result));

    function subscribe(target)
    {
        console.log("subscribe " + target);
        connection.subscribe(target, callback);
        setSubscriptions(old => [...old, target]);
    }

    function unsubscribe(target)
    {
        console.log("unsubscribe " + target);
        connection.unsubscribe(target, callback);
        setSubscriptions(old => old.filter(item => item != target));
    }

    const logToggle = (label, events, labelPlacement='bottom') =>
    {
        const isEnabled = events.every(event => subscriptions.includes(event));

        return (
            <FormControlLabel
                style={{flexGrow: 1}}
                value="label"
                control={<Checkbox color="primary" />}
                label={label}
                labelPlacement={labelPlacement}
                checked={isEnabled}
                onChange={() =>
                    events.forEach(event =>
                        isEnabled ? unsubscribe(event) : subscribe(event),
                    )}
            />
        );
    };

    const logToggleDropdown = (option, { selected }) =>
    {

        const isEnabled = events.every(event => subscriptions.includes(event));

        return (
            <>
                <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
                />
                {option}
            </>
        );
    };

    const logOptions = () =>
    {
        return [
            logToggle('Trace', ['TraceLog']),
            logToggle('Debug', ['DebugLog']),
            logToggle('Info', ['InfoLog']),
            logToggle('Warn', ['WarnLog']),
            logToggle('Error', ['ErrorLog']),
            logToggle('Fatal', ['FatalLog']),
            logToggle('All Logs', allLogs)
        ];
    }

    function onChange(e, newValue)
    {
        setSubscriptions(old =>
        {
            for (var item of newValue)
            {
                if (!old.includes(item))
                {
                    console.log("subscribe " + item);
                    connection.subscribe(item, callback);
                }
            }
            
            for (var item of old)
            {
                if (!newValue.includes(item))
                {
                    console.log("unsubscribe " + item);
                    connection.unsubscribe(item, callback);
                }
            }

            return newValue;
        });
    }

    return <FormGroup style={{flexGrow:1}}>

        {wide ?
            [
                //  ...logOptions(),
                <Autocomplete 
                    multiple 
                    disableCloseOnSelect
                    value={subscriptions} 
                    onChange={onChange}
                    options={events.filter(item => !hiddenAndLogEvents.includes(item.name)).map(item => item.name)}
                    renderInput={params => <TextField {...params} label="Subscriptions" variant="outlined" />}
                    getOptionLabel={item => item}
                    renderOption={logToggleDropdown}/>
            ]
            :
            [
                // <TextField icon='search' iconPosition='left' name='search' value={eventSearch} onChange={(event, args) => setEventSearch(args.value)} />,
                // events.filter((event) => event.name.match(eventSearchRegex)).map((event) => hiddenEvents.includes(event.name) ? null : logToggle(event.name, [event.name]))
            ]
        }
    </FormGroup>
}