import React from 'react';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import { ModuleWrapper, StatHeader } from './core/common';
import { TextField, Grid, Table, TableBody, TableRow, TableCell, Button, IconButton, Icon } from '@material-ui/core';

import { PlayerDropdown } from './helpers/players';

export const moduleName = 'Selection Helper';

export const moduleSize =
{
    defaultWidth: 4,
    defaultHeight: 4,
    minWidth: 2,
    minHeight: 2,
    maxWidth: 10,
    maxHeight: 10
}

export const module = ({config, onConfigChange, group, server, connection}) =>
{
    var [player, setPlayer] = React.useState();
    var [length, setLength] = React.useState(2);

    var [results, setResults] = React.useState([]);
    var [selected, setSelected] = React.useState(0);

    async function submit(e)
    {
        e.preventDefault();
        
        var command = `select find ${player} ${length}`;
        var result = await connection.send(command);

        var items = result.Result;

        setResults(items);
    }

    async function select(id)
    {
        var command = `select ${id}`;

        var result = await connection.send(command);

        if (!result.Exception)
        {
            setSelected(id);
        }
    }

    if (connection.isConnected)
    {
        var content = <>
            <form onSubmit={submit}>
                <Grid container>
                    <Grid item xs={8}>
                        <PlayerDropdown server={server} connection={connection} value={player} onChange={setPlayer} fullWidth label='Player'/>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField label='Distance' type='number' value={length} onChange={(e) => setLength(e.currentTarget.value)}/>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton type='submit' disabled={!player}><Icon>play_arrow</Icon></IconButton>
                    </Grid>
                </Grid>
            </form>
            <Table size="small">
                <TableBody>
                    {results.map(item =>
                    <TableRow>
                        <TableCell>{item.Identifier}</TableCell>
                        <TableCell>{item.Name}</TableCell>
                        <TableCell><Button disabled={selected == item.Identifier} onClick={() => select(item.Identifier)}>Select</Button></TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </>
    }
    else
    {
        var content = "Must be connected";
    }

    return (
        <ModuleWrapper>
            <StatHeader color='info' icon='select_all' title={moduleName}/>
            <CardBody style={{overflowY: 'auto'}}>
                {content}
            </CardBody>
            <CardFooter></CardFooter>
        </ModuleWrapper>
    );
};