import React, {useEffect, useState} from 'react'
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import { Users } from 'alta-jsapi'

export default function UserInputField( {onValidate}) {

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  let validateUserEntry = (e, value) => {
    e.preventDefault();
    var userEntry = e.target.value;
    let getUserInfo = Users.getInfo;

    if (isNaN(userEntry)){
      getUserInfo = Users.findUserByUsername;
    }
    else {
      userEntry = parseInt(userEntry);
    }

    console.log(getUserInfo);
    getUserInfo(userEntry).then((userInfo)=>{
      console.log(userInfo);
      setError(false);
      setSuccess(true);
      onValidate(true);
    }).catch((e)=> {
      console.log(e);
      setError(true);
      setSuccess(false);
      onValidate(false);
    });
  }

  return (
    <>
        <InputLabel>
          {"User..."}
        </InputLabel>
      <Input 
      onChange={validateUserEntry}
        inputProps={{
          required: true,
          name: "user",
          endAdornment: (
            <InputAdornment position="end">
              <Icon>
                lock_outline
              </Icon>
            </InputAdornment>
          )
        }} />
      
      {error ? (
        <Clear style={{color:'red'}} />
      ) : success ? (
        <Check style={{color:'green'}} />
      ) : null}
      </>
  );
}

