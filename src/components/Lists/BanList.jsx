import React, {useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';

const fields = [
  {label: "ID", getValue : b => b.id}
  ];

 function BanList({ getListFunc }) {

    const [banList, setBanList] = useState([]);
    let currentPath = useLocation().pathname;
    let history = useHistory();

    useEffect(() => {
      getListFunc().then(setBanList).catch(e => console.log("Error: " + e))
    }, [getListFunc]);

    function goToDetails(banId) {
      history.push(currentPath + "/" + banId);
    }

    return (
        <Table>
          <TableHead>
            <TableRow>
              {fields.map(field =>
                  <TableCell key={field.name}>
                    {field.label}
                  </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {banList.map(ban => 
                <TableRow key={ban.id} >
                    {fields.map(field =>
                    <TableCell key={field.name}>
                      {field.getValue(ban)}
                    </TableCell>)}
                    {/* <Button 
                      variant="contained"
                      color="default"
                      onClick={() => goToDetails(ban.id)}
                      >Info</Button> */}
                </TableRow>)}
          </TableBody>
        </Table>
    )
}

export default BanList