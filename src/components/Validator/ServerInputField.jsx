import React, { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import { Servers } from "alta-jsapi";

export default function ServerInputField({ onValidateInput }) {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverName, setServerName] = useState(undefined);

  let validateUserEntry = (e) => {
    e.preventDefault();
    var serverEntry = e.target.value;

    Servers.getDetails(serverEntry)
      .then((serverInfo) => {
        setError(false);
        setSuccess(true);
        console.log("inputfield serverId: ", serverInfo.id);
        if (serverName != undefined) {
          console.log("defined: ");
          setServerName(serverInfo.name);
        }
        onValidateInput(serverInfo.id);
      })
      .catch((e) => {
        console.log(e);
        setError(true);
        setSuccess(false);
        onValidateInput(undefined);
      });
  };

  return (
    <>
      <InputLabel>{"Server Id..."}</InputLabel>
      <Input
        onChange={validateUserEntry}
        inputProps={{
          required: true,
          name: "serverId",
          endAdornment: (
            <InputAdornment position="end">
              <Icon>lock_outline</Icon>
            </InputAdornment>
          ),
        }}
      />

      {error ? (
        <Clear style={{ color: "red" }} />
      ) : success ? (
        <Check style={{ color: "green" }} />
      ) : null}
      {serverName == undefined ? <></> : <label>{serverName}</label>}
    </>
  );
}
