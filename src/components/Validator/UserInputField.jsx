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

  let validateUserEntry = (e) => {
    e.preventDefault();
    var userEntry = e.target.value;
    let getUserInfo = Users.getInfo;

    if (isNaN(userEntry)) {
      getUserInfo = Users.findUserByUsername;
    } else {
      userEntry = parseInt(userEntry);
    }

    console.log(getUserInfo);
    getUserInfo(userEntry)
      .then((userInfo) => {
        console.log(userInfo);
        setError(false);
        setSuccess(true);
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
    </>
  );
}
