import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";

export default function SearchField({ handleInput }) {
  var [search, setSearch] = useState("");

  function handleChange(e) {
    var value = e.target.value;
    console.log(value);
    setSearchString(value);
  }

  function setSearchString(value) {
    setSearch(value);
    handleInput(value);
  }

  return (
    <div>
      <TextField
        label="Search"
        InputProps={{
          value: search,
          onChange: handleChange,
          endAdornment: (
            <InputAdornment position="end">
              <Button onClick={() => setSearchString("")}>
                <ClearIcon />
              </Button>
            </InputAdornment>
          ),
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
    </div>
  );
}
