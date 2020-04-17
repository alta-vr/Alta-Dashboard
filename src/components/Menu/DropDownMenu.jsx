import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function DropDownMenu ({ values, handleChange }) {
    const [current, setCurrent] = useState(values[0]);

    useEffect(() => {
        setCurrent(current);
        console.log("Values: " + values)
    }, [values]);

    const handleChangeInternal = (event) => {
        setCurrent(event.target.value);
        handleChange(event);
      };

    return (
        <FormControl>
            <FormHelperText>Select a list of Servers</FormHelperText>
            <Select
                id="dropDownMenu"
                value={current}
                onChange={handleChangeInternal}
            >
                {values.map(value =>
                    <MenuItem value={value} key={value.label}>{value.label}</MenuItem>
                )}
            </Select>
        </FormControl>
    );
}

// DropDownMenu.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default DropDownMenu;

