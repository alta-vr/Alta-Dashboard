import React from 'react'
import CustomInput from "components/CustomInput/CustomInput.jsx"
import Button from "components/CustomButtons/Button.jsx";
import Search from "@material-ui/icons/Search";

export default function SearchBar(props) {
    let { searchFor } = props;
    return (
        <>
          <CustomInput 
            formControlProps={{
              className: "Search-" + searchFor
            }}
            inputProps={{
              placeholder: "Search " + searchFor,
              inputProps: {
                "aria-label": "Search"
              }
            }}
          />
        <Button color="white" aria-label="edit" justIcon round>
          <Search />
        </Button>
        </>
    )
}
