import React, { useState, useEffect } from 'react';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import { ModuleWrapper, BasicHeader } from './core/common';
import { Field } from './core/common';
import { ListItem } from '@material-ui/core';

export const moduleName = 'Connection Info';

export const moduleSize =
{
    defaultWidth: 3,
    defaultHeight: 4,
    minWidth: 2,
    minHeight: 2,
    maxWidth: 4,
    maxHeight: 6
}

export var module = ({config, onConfigChange, group, server, connection}) =>
{
    var [messages, setMessages] = useState([]);

    //Clear on server change
    useEffect(() => setMessages([]), [server.id]);

    const appendSystem = (message) =>
    {
        setMessages(prev => [...prev, message]);
    }

    connection.useEvent('system', appendSystem);    

    var status = "Unknown!!!";

    if (connection.isConnecting) status = "Connecting";
    if (connection.isConnected) status = "Connected";
    if (connection.isTerminated) status = "Disconnected";
    if (connection.isForbidden) status = "Forbidden";

    return (
        <ModuleWrapper>
            <BasicHeader color='info' title={moduleName}/>
            <CardBody style={{overflowY: 'auto'}}>
                <Field label="Status">{status}</Field>
                <Field label="System Messages">{messages.map(item => <ListItem>{item}</ListItem>)}</Field>
            </CardBody>
            <CardFooter></CardFooter>
        </ModuleWrapper>
    );
};