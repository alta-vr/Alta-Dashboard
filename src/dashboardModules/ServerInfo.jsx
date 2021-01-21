import React, { useState, useEffect } from 'react';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import { ModuleWrapper, StatHeader, Field } from './core/common';

export const moduleName = 'Server Info';

export const moduleSize =
{
    defaultWidth: 3,
    defaultHeight: 4,
    minWidth: 2,
    minHeight: 2,
    maxWidth: 4,
    maxHeight: Infinity
}

const scenes = [
    'The Town',
    'Tutorial',
    'Test Zone',
    'Climbing Preview'
  ]
  
function ElapsedTimer({time, callback, callbackTime})
{
  const [value, setValue] = useState(0);

  useEffect(() =>
  {
    var interval = setInterval(() => setValue(value + 1));

    return () => clearInterval(interval);
  });

  return Math.round((Date.now() - time) / 1000);
}

export const module = ({box, config, onConfigChange, group, server, connection}) =>
{
    var time = Date.parse(server.online_ping);
    var hasTime = Date.now() - time < 600000;

    return (
        <ModuleWrapper>
            <StatHeader color='info' icon='info' title={moduleName} value={server.name}/>
            <CardBody style={{overflowY: 'auto'}}>
                <Field label='ID'>{server.id}</Field>
                <Field label='Region'>{server.region}</Field>
                <Field label='Version'>{server.version}</Field>
                <Field label='Scene'>{scenes[server.scene_index]}</Field>
                <Field label='Group'>{server.group_id}</Field>
                <Field label='Last Ping'>{hasTime ? [<ElapsedTimer time={time}/>, 's ago'] : 'Offline'}</Field>
            </CardBody>
            <CardFooter></CardFooter>
        </ModuleWrapper>
    );
};

