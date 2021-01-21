import React, { useState, useEffect } from 'react';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import { ModuleWrapper, StatHeader, Field } from './core/common';
import { Chip } from '@material-ui/core';

export const moduleName = 'Group Info';

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
    return (
        <ModuleWrapper>
            <StatHeader color='info' icon='info' title={moduleName} value={group.name}/>
            <CardBody style={{overflowY: 'auto'}}>
                <Field label='ID'>{group.id}</Field>
                <Field label='Description'>{group.description}</Field>
                <Field label='Creation'>{new Date(group.created_at).toLocaleDateString("en-AU", { day:'numeric', month: 'long', year:'numeric'})}</Field>
                <Field label='Members'>{group.member_count}</Field>
                <Field label='Visibility'>{group.type }</Field>
                <Field label='Tags'>{(group.tags || []).join(', ')}</Field>
                <Field label='Roles'>{group.roles.map(item => <Chip style={
                {
                    border: '1px darkGray solid',
                    marginRight: '5px',
                    backgroundColor:item.color || (item.role_id == 7 ? 'orange' : (item.role_id == 2 ? 'yellow' : 'white'))
                }
                } label={item.name} size='small'/>)}</Field>
            </CardBody>
            <CardFooter></CardFooter>
        </ModuleWrapper>
    );
};

