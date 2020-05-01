import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function AutoCompleteDropDown({ ...props }) {
  const { title, list, onChange, style } = props;
  var [text, setText] = useState("");

  function handleValue(event, value) {
    onChange(value);
    setText("");
  }

  return (
    <Autocomplete
      inputValue={text}
      autoSelect={false}
      options={list}
      onChange={handleValue}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          onChange={(e) => setText(e.target.value)}
          {...params}
          label={"Select " + title}
          variant="outlined"
        />
      )}
    />
  );
}
