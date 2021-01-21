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
import ExtendedTable from "components/ExtendedTable/ExtendedTable.jsx";

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

function BanList({ currentList, children }) {
  const tableColumns = [
    { id: "ban_id", name: "ID", field: "ban_id", state: true },
    // { id: "username", name: "Name", field: "username", state: true },
    // { id: "3", name: "Online Players", field: "online_players", state: true },
    {
      id: "name",
      name: "User Id",
      field: "user_id",
      state: true,
    },
    // {
    //   id: "username",
    //   name: "User name",
    //   field: (b) => getUserName(b),
    //   state: true,
    // },
    { id: "type", name: "Type", field: "type", state: true },
    {
      id: "created_by",
      name: "Created by",
      field: "created_by",
      state: true,
    },
    {
      id: "created_at",
      name: "Created on",
      field: (b) => <FormattedDate date={b.created_at} />,
      state: true,
      align: "right",
    },
    {
      id: "end_time",
      name: "End time",
      field: (b) => <FormattedDate date={b.end_time} />,
      state: true,
      align: "right",
    },
  ];

  const [banList, setBanList] = useState(currentList);
  const [isLoading, setIsLoading] = useState(true);
  let currentPath = useLocation().pathname;
  let history = useHistory();

  useEffect(() => {
    if (currentList == undefined) {
      setBanList([]);
      return;
    }
    // currentList.forEach((ban) => {
    //   Users.getInfo(ban.user_id)
    //     .then((userInfo) => {
    //       // can't figure out scope of this bit
    //       ban.username = userInfo.username;
    //       // console.log("Ban: ", ban);
    //     })
    //     .catch((e) => console.log(e));
    // });
    setBanList(currentList);
    // console.log(getUserName(currentList[0].user_id));
    setIsLoading(false);
  }, [currentList]);

  useEffect(() => {});

  // function getUserName(userId) {
  //   Users.getInfo(userId)
  //     .then((userName) => {
  //       console.log("Username: ", userName.username);
  //       return userName.username;
  //     })
  //     .catch((e) => console.log(e));
  // }

  function goToDetails(ban) {
    history.push({
      pathname: currentPath + "/" + ban.ban_id,
      banInfo: ban,
    });
  }

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <ExtendedTable
          defaultColumns={tableColumns}
          data={banList}
          tableName={"Bans"}
          onRowClick={goToDetails}
          isLoading={isLoading}
        >
            {children}
        </ExtendedTable>
      )}
    </>
    // <Table>
    //   <TableHead>
    //     <TableRow>
    //       {fields.map((field) => (
    //         <TableCell key={field.label}>{field.label}</TableCell>
    //       ))}
    //     </TableRow>
    //   </TableHead>
    //   <TableBody>
    //     {!banList ? (
    //       <></>
    //     ) : (
    //       banList.map((ban) => (
    //         <TableRow key={ban.ban_id} hover style={{ cursor: "pointer" }}>
    //           {fields.map((field) => (
    //             <TableCell key={field.label} onClick={() => goToDetails(ban)}>
    //               {field.getValue(ban)}
    //             </TableCell>
    //           ))}
    //         </TableRow>
    //       ))
    //     )}
    //   </TableBody>
    // </Table>
  );
}

export default BanList;
