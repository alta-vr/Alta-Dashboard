import React, {useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';

const fields = [
  {label: "ID", getValue : s => s.id},
  {label: "Name", getValue : s => s.name},
  {label: "Online Players", getValue : s => s.online_players.length},
  {label: "Region", getValue : s => s.region},
  {label: "Status", getValue : s => s.server_status},
  ];

 function ServerList({ getListFunc }) {

    const [serverList, setServerList] = useState([]);
    let currentPath = useLocation().pathname;
    let history = useHistory();

    useEffect(() => {
      getListFunc().then(setServerList).catch(e => console.log("Error: " + e));
      
    }, [getListFunc]);

    function goToDetails(serverId) {
      history.push(currentPath + "/" + serverId);
    }

    return (
        <Table>
          <TableHead>
            <TableRow>
              {fields.map(field =>
                  <TableCell key={field.label}>
                    {field.label}
                  </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {serverList.map(server => 
                <TableRow key={server.id} >
                    {fields.map(field =>
                    <TableCell key={field.name}>
                      {field.getValue(server)}
                    </TableCell>)}
                    <Button 
                      variant="contained"
                      color="default"
                      onClick={() => goToDetails(server.id)}
                      >DashBoard</Button>
                </TableRow>)}
          </TableBody>
        </Table>
    )
}

export default ServerList