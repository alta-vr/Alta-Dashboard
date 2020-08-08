import React, { useState } from 'react';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import { ModuleWrapper, StatHeader } from './core/common';
import { ListItem } from '@material-ui/core';

import { usePlayers } from './helpers/players';

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
    var list = usePlayers(server, connection);

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