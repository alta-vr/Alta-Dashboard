import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Users } from "alta-jsapi";
import { Button } from "@material-ui/core";
import FormattedDate from "components/Formats/FormattedDate.jsx";

function BanList({ currentList }) {
  const fields = [
    { label: "Ban ID", getValue: (b) => b.ban_id },
    { label: "User Name", getValue: (b) => b.username },
    { label: "User ID", getValue: (b) => b.user_id },
    // { label: "Ip addr", getValue: (b) => b.ip_address },
    // { label: "Reason", getValue: (b) => b.reason },
    { label: "Type", getValue: (b) => b.type },
    // { label: "Servers", getValue: (b) => b.servers },
    { label: "End Time", getValue: (b) => <FormattedDate date={b.end_time} /> },
    {
      label: "Created on",
      getValue: (b) => <FormattedDate date={b.created_at} />,
    },
    { label: "Created by", getValue: (b) => b.created_by },
  ];
  const [banList, setBanList] = useState(currentList);
  let currentPath = useLocation().pathname;
  let history = useHistory();

  useEffect(() => {
    if (currentList == undefined) {
      setBanList([]);
      return;
    }
    currentList.forEach((ban) => {
      Users.getInfo(ban.user_id)
        .then((userInfo) => {
          // can't figure out scope of this bit
          ban.username = userInfo.username;
          // console.log("Ban: ", ban);
        })
        .catch((e) => console.log(e));
    });
    console.log("Current list: ", currentList);
    setBanList(currentList);
  }, [currentList]);

  useEffect(() => {});

  function getUserName(userId) {
    Users.getInfo(userId)
      .then((userName) => {
        console.log("Username: ", userName.username);
        return userName.username;
      })
      .catch((e) => console.log(e));
  }

  function goToDetails(ban) {
    console.log("Ban: ", ban);
    history.push({
      pathname: currentPath + "/" + ban.ban_id,
      banInfo: ban,
    });
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          {fields.map((field) => (
            <TableCell key={field.label}>{field.label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {!banList ? (
          <></>
        ) : (
          banList.map((ban) => (
            <TableRow key={ban.ban_id} hover style={{ cursor: "pointer" }}>
              {fields.map((field) => (
                <TableCell key={field.label} onClick={() => goToDetails(ban)}>
                  {field.getValue(ban)}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

export default BanList;
