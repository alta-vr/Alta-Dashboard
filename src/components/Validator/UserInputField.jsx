import React, { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import { Users } from "alta-jsapi";

export default function UserInputField({ onValidateInput }) {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userName, setUserName] = useState(undefined);

  let validateUserEntry = (e) => {
    e.preventDefault();
    var userEntry = e.target.value;
    if (userEntry.length < 3) {
      return;
    }
    let getUserInfo = Users.getInfo;

    if (isNaN(userEntry)) {
      getUserInfo = Users.findUserByUsername;
      setUserName(undefined);
    } else {
      userEntry = parseInt(userEntry);
      setUserName("");
    }

    getUserInfo(userEntry)
      .then((userInfo) => {
        setError(false);
        setSuccess(true);
        console.log("user name: ", userInfo.username);
        if (userName != undefined) {
          console.log("defined: ");
          setUserName(userInfo.username);
        }
        onValidateInput(userInfo);
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
      <InputLabel>{"User..."}</InputLabel>
      <Input
        onChange={validateUserEntry}
        inputProps={{
          required: true,
          name: "user",
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
      {userName == undefined ? <></> : <label>{userName}</label>}
    </>
  );
}
