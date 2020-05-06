import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Button } from "@material-ui/core";

const fields = [
  { label: "ID", getValue: (s) => s.id },
  { label: "Name", getValue: (s) => s.name },
  { label: "Online Players", getValue: (s) => s.online_players.length },
  { label: "Region", getValue: (s) => s.region },
  { label: "Status", getValue: (s) => s.server_status },
];

export default function ServerList({ getListFunc, search }) {
  const [serverList, setServerList] = useState([]);
  const [backupList, setBackupList] = useState([]);
  // const [filter, setFilter] = useState(search);
  let currentPath = useLocation().pathname;
  let history = useHistory();

  useEffect(() => {
    getListFunc()
      .then(setBackupList)
      .catch((e) => console.log("Error: " + e));
    setServerList(backupList);
  }, [getListFunc]);

  useEffect(() => {
    filterList(search);
  }, [search]);

  useEffect(() => {
    console.log("Changed");
  }, [serverList]);

  function filterList(filter) {
    var newList = backupList.filter((server) => {
      if (server.name.includes(filter)) {
        return server;
      }
    });
    console.log("newlist: ", newList);
    setServerList(newList);
  }

  function goToDetails(serverId) {
    history.push(currentPath + "/" + serverId);
  }

  function sortColumn(event) {
    // Insert sorting alg
    console.log("Sorting column: ", event);
    var tempServerList = serverList;

    // console.log("Templist1: " , tempServerList);
    tempServerList.sort(function(a, b) {
      return a.online_players.length - b.online_players.length;
    });
    // console.log("Templist2: " , tempServerList);
    // tempServerList = [];
    setServerList(tempServerList);
    console.log("ServerList: ", serverList);
  }

  // function cmpPlayers(a,b){
  //   // console.log("a: " , a.online_players.length, " b: ", b);
  //   return a.online_players.length - b.online_players.length;
  // }

  return (
    <Table>
      <TableHead>
        <TableRow>
          {fields.map((field) => (
            <TableCell key={field.label}>
              <Button onClick={() => sortColumn(field.label)}>
                {field.label}
              </Button>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {serverList.map((server) => (
          <TableRow
            key={server.id}
            hover
            style={{ cursor: "pointer" }}
            onClick={() => goToDetails(server.id)}
          >
            {fields.map((field) => (
              <TableCell key={field.name}>{field.getValue(server)}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
