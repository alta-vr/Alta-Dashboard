import React, { useState, useEffect } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab/";

export default function DropDownMenu(props) {
  const { title, values, handleChange, inputChanged } = props;
  const [current, setCurrent] = useState(values[0]);

  //   useEffect(() => {
  //     setCurrent(current);
  //   }, [values, current]);

  const handleChangeInternal = (event) => {
    setCurrent(event.target.value);
    handleChange(event.target.value);
  };

  return (
    <FormControl>
      <FormHelperText>Select {title}</FormHelperText>
      <Select id="dropDownMenu" value={current} onChange={handleChangeInternal}>
        {values.map((value) => (
          <MenuItem value={value} key={value.label}>
            {value.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
