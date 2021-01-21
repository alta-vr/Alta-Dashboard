import * as React from 'react';
import styled, { css } from 'styled-components';
import * as _ from 'lodash';

import { StringLiteral } from '@babel/types';
import MessageRow from './MessageRow';

import { DataGrid } from '@material-ui/data-grid'

const colors =
{
    ['success'] : "#C5F9D8",
    ['normal'] : "#EDF4F7",
    ['warning'] : "#F9F0C5",
    ['error'] : "#F9C5C5",
}

const columns = [
    { field: 'timeStamp', headerName: 'Time', width: 120, type: 'date' },
    { field: 'type', headerName: 'Type', width: 120 },
    { field: 'eventType', headerName: 'Event', width: 120 },
    { field: 'logger', headerName: 'Logger', width: 120 },
    { field: 'message', headerName: 'Message', flex: 1, sortable: false }
]

export default function MessageTable(props)
{
    var items = props.messages.map(fitToTable);

    return <DataGrid columns={columns} rows={items}/>;
}

const allLogs = [
    'TraceLog',
    'DebugLog',
    'InfoLog',
    'WarnLog',
    'ErrorLog',
    'FatalLog',
];

function fitToTable(item)
{
    if (!item)
    {
        console.error("Item undefined!");
        return { id: -1};
    }

  var result = { ...item };

  result.color = 'normal';
  result.timeStamp = new Date(item.data.timeStamp || item.timeStamp);
  result.logger = item.data.logger;

  if (item.eventType == 'WarnLog')
  {
    result.color = 'warning';
  }
  else if (item.eventType == 'ErrorLog' || item.eventType == 'FatalLog')
  {
    result.color = 'error';
  }
  else if (!allLogs.includes(item.eventType))
  {
    result.color = 'success';
  }

  
  if (typeof item.data == 'string')
  {
    result.message = item.data;
  }
  else if (!!item.data.message)
  {
    result.message = item.data.message;
  }
  else if (!!item.data.Result)
  {
    result.message = JSON.stringify(item.data.Result);
  }
  else if (!!item.data.StringResult)
  {
    result.message = item.data.StringResult;
  }
  else
  {
      result.message = JSON.stringify(item.data);
  }

  if (!!item.data.Exception)
  {
    result.color = 'error';
    result.message = item.data.Exception.Message;
  }

  return result;
}