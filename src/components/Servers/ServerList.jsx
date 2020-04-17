import React, { useState, useEffect } from 'react';
import { Servers, Sessions } from 'alta-jsapi';
// material-ui
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const lists = {
    console: Servers.getConsoleServers,
    controllable: Servers.getControllable,
    joined: Servers.getJoined,
    open: Servers.getOpen,
    public: Servers.getPublic,
    favorites: Servers.getFavorites
}

const fields = [
  {label: "ID", name: "id"},
  {label: "Name", name: "name"},
  {label: "Region", name: "region"},
  {label: "Status", name: "server_status"},
];

 function ServerList({ list }) {

    const [serverList, setServerList] = useState([]);

    useEffect(() => {
        lists[list]().then(setServerList).catch(e => console.log("Error: " + e));
      }, [list]);

    return (
        <Table>
          <TableHead>
            <TableRow>
              {fields.map(field => {
                return (
                  <TableCell key={field.name}>
                    {field.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {serverList.map(server => 
            // onClick={(event) => generateList(event)}
                <TableRow key={server.id} >
                    {fields.map(field =>
                    <TableCell key={field.name}>
                      {server[field.name]}
                    </TableCell>)}
                </TableRow>)}
          </TableBody>
        </Table>
    )
}

export default ServerList