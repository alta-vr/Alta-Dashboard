import React from 'react';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import { ModuleWrapper, StatHeader } from './core/common';

export const moduleName = 'Template';

export const moduleSize =
{
    defaultWidth: 2,
    defaultHeight: 2,
    minWidth: 2,
    minHeight: 2,
    maxWidth: 2,
    maxHeight: 2
}

export const module = ({config, onConfigChange, group, server, connection}) =>
{
    return (
        <ModuleWrapper>
            <StatHeader color='info' icon='info' title={moduleName}/>
            <CardBody style={{overflowY: 'auto'}}>
                Hello World!
            </CardBody>
            <CardFooter></CardFooter>
        </ModuleWrapper>
    );
};