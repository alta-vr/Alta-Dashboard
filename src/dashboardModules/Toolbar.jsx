import React from 'react';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import { ModuleWrapper, BasicHeader } from './core/common';
import { Table, TextField, Button } from '@material-ui/core';

export const moduleName = 'Toolbar';

export const moduleSize =
{
    defaultWidth: 2,
    defaultHeight: 2,
    minWidth: 2,
    minHeight: 2,
    maxWidth: 4,
    maxHeight: 10
}

export const module = ({box, config, onConfigChange, group, server, connection}) =>
{
    var [commands, setCommands] = React.useState(config.commands || ['player list']);

    var setInput = (i, value) =>
    {
        var newCommands = [...commands];
        
        newCommands[i] = value;

        setCommands(newCommands);

        onConfigChange({...config, commands:newCommands});
    }

    var addNew = () =>
    {
        var newCommands = [...commands, 'player list'];

        setCommands(newCommands);

        onConfigChange({...config, commands:newCommands});
    }

    var remove = i =>
    {
        var newCommands = [...commands];

        newCommands.splice(i, 1);

        setCommands(newCommands);

        onConfigChange({...config, commands:newCommands});
    }

    return (
        <ModuleWrapper>
            <BasicHeader color='info' title={moduleName}/>
            <CardBody style={{overflowY: 'auto'}}>
                {commands.map((item, i) => <Row command={item} setInput={setInput} i={i} remove={remove}/>)}
                <br/>
                <Button color='secondary' variant='outlined' fullWidth onClick={addNew}>Add</Button>
            </CardBody>
            <CardFooter></CardFooter>
        </ModuleWrapper>
    );
};

const Row = ({i, command, setInput, remove}) =>
{
    var field = React.useRef();

    var copy = e =>
    {
        e.preventDefault();

        if (command == '')
        {
            remove(i);
        }
        else
        {
            field.current.select();
            document.execCommand('copy');
        }
    }

    return <form onSubmit={copy} style={{display:'flex', flexDirection:'row', marginBottom:'10px'}}>
        <TextField inputRef={field} variant="outlined" fullWidth value={command} onChange={(event) => setInput(i, event.target.value)}/>
        <Button type='submit' color='primary'>{command == '' ? 'Delete' : 'Copy'}</Button>
    </form>;
}