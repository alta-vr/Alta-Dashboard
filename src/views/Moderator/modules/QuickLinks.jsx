import React from 'react';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import { ModuleWrapper, BasicHeader } from '../../../dashboardModules/core/common';
import { Table, TextField, Button } from '@material-ui/core';

export const moduleName = 'Quick Links';

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
    return (
        <ModuleWrapper>
            <BasicHeader color='info' title={moduleName}/>
            <CardBody style={{overflowY: 'auto'}}>
                <Button fullWidth href='moderator/bans/view'>View Bans</Button>
                <Button fullWidth href='moderator/bans/create'>Create Ban</Button>
                <Button fullWidth href='forms/legacy-server-player-report/responses'>Player Reports</Button>
                <Button fullWidth href='forms/legacy-server-lost-items/responses'>Lost Items</Button>
            </CardBody>
            <CardFooter></CardFooter>
        </ModuleWrapper>
    );
};