import React, { useState } from 'react';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import { ModuleWrapper, StatHeader } from './core/common';
import { TextField, Button, ListItem } from '@material-ui/core';
import { isArray } from 'util';
import { BasicHeader } from './core/common';

export const moduleName = 'Command Runner';

export const moduleSize =
{
    defaultWidth: 3,
    defaultHeight: 2,
    minWidth: 2,
    minHeight: 2,
    maxWidth: 4,
    maxHeight: Infinity
}

export const module = ({config, onConfigChange, group, server, connection}) =>
{
    var [input, setInput] = useState('');
    var [result, setResult] = useState(undefined);
    var [error, setError] = useState(undefined);

    function onSubmit(evt)
    {
        evt.preventDefault();

        connection.send(input)
        .then(item =>
        {
            if (item.Exception != null)
            {
                console.error(item);

                setResult(undefined);
                setError(item.Exception.Message);
            }
            else
            {
                console.log(item);

                setError(undefined);
                setResult(item.Result || item.ResultString);
            }
        })
        .catch(error =>
        {
            setResult(undefined);
            setError(JSON.stringify(error));
        });

        setInput('');
    }

    if (connection.isConnected)
    {
        var content = <>
            <form onSubmit={onSubmit}>
                <TextField label='Command' variant="outlined" fullWidth value={input} onChange={(event) => setInput(event.target.value)}/>
                <Button type='submit' fullWidth color='primary'>Run</Button>
            </form>
            {isArray(result) ? result.map(item => <ListItem>{typeof item == 'string' ? item : JSON.stringify(item)}</ListItem>) : <p>{typeof result == 'string' ? result : JSON.stringify(result)}</p>}
            <p>{error}</p>
        </>;
    }
    else
    {
        var content = "Not connected";
    }



    return (
        <ModuleWrapper>
            <BasicHeader color='info' title={moduleName}/>
            <CardBody style={{overflowY: 'auto'}}>
                {content}

            </CardBody>
            <CardFooter></CardFooter>
        </ModuleWrapper>
    );
};