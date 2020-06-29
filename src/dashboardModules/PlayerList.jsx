import React, { useState } from 'react';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import { ModuleWrapper, StatHeader } from './core/common';
import { ListItem } from '@material-ui/core';

export const moduleName = 'Player List';

export const moduleSize =
{
    defaultWidth: 2,
    defaultHeight: 4,
    minWidth: 2,
    minHeight: 2,
    maxWidth: 4,
    maxHeight: Infinity
}

export const module = ({ config, onConfigChange, group, server, connection }) =>
{
    var [players, setPlayers] = useState(undefined);

    //Get live player list, and update it whenever a user joins or leaves
    connection.useCommand('player list', result => setPlayers(result.Result));
    connection.useSubscription('PlayerJoined', data => setPlayers(old => [...old, data.user]));
    connection.useSubscription('PlayerLeft', data => setPlayers(old => old.filter(item => item.id != data.user.id)));

    //Use live list if available, otherwise use from database (up to 30s out of date)
    var list = players || server.online_players;

    //Sort by username
    list = list.sort((a, b) => a.username.localeCompare(b.username));

    return (
        <ModuleWrapper>
            <StatHeader color='info' icon='accessibility' title={moduleName} value={list.length + ' online'} />
            <CardBody style={{ overflowY: 'auto' }}>
                {list.map((player) => (
                    <ListItem>{player.username} <code>({player.id})</code></ListItem>
                ))}
            </CardBody>
            <CardFooter></CardFooter>
        </ModuleWrapper>
    );
};