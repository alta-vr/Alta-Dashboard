import React, { useState, useEffect } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import {Autocomplete} from '@material-ui/lab/';

function DropDownMenu ({ title, values, handleChange }) {
    const [current, setCurrent] = useState(values[3]);


    useEffect(() => {
        setCurrent(current);
    }, [values]);

    // useEffect(() => {
    //     setCurrent(current);
    // }, [current]);

    const handleChangeInternal = (event) => {
        setCurrent(event.target.value);
        handleChange(event);
      };

    // function getOptions(){
    //     // let options = values.map(value =>
    //     //     value.label
    //     //     );
    //     // console.log(options);
    //     console.log("Got options");
    //     return [
    //         {label: "label 1"},
    //         {label:"labal 2"}
    //     ]
    // }

    // const getOptions = [
    //     {label: "label 1"},
    //     {label:"labal 2"}
    // ]

    return (
        // <Autocomplete
        //   id="dropDownBox"
        //   options={getOptions()}
        //   getOptionLabel={(option) => option.label}
        //   style={{ width: 300 }}
        //   autoHighlight
        //   onClick={getOptions}
        //   renderInput={(params) =>
        //   <TextField {...params} label={title} variant="outlined" />}
        // />
        <FormControl>
            <FormHelperText>Select {title}</FormHelperText>
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

