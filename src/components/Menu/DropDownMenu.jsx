import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function DropDownMenu ({ listNames, handleChange }) {
    const [list, setList] = useState(listNames);

    useEffect(() => {
        setList(listNames);
        console.log("lists: " + listNames)
    }, [listNames]);

    return (
        <FormControl>
            <FormHelperText>Select a list of Servers</FormHelperText>
            <Select
                id="dropDownMenu"
                value=""
                onChange={handleChange}
                inputProps={{ readOnly: true }}
            >
                <MenuItem value="select">
                </MenuItem>
                {listNames.map(list =>
                    <MenuItem value={list} key={list}>{list}</MenuItem>
                )}
            </Select>
        </FormControl>
    );
}

// DropDownMenu.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default DropDownMenu;

