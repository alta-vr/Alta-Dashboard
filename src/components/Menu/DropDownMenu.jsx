import React, { useState, useEffect } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function DropDownMenu ({ values, handleChange }) {
    const [current, setCurrent] = useState(values[3]);

    useEffect(() => {
        setCurrent(current);
    }, [values]);

    const handleChangeInternal = (event) => {
        setCurrent(event.target.value);
        handleChange(event);
      };

    return (
        <FormControl>
            <FormHelperText>Select server group</FormHelperText>
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

export default DropDownMenu;

