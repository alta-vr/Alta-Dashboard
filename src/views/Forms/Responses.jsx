import React from 'react';
import { Redirect } from 'react-router';
import { useHistory } from "react-router-dom";
import { Typography, Button, Grid, Paper, RadioGroup, Radio, Divider, FormControlLabel, Checkbox, TextField, FormGroup } from '@material-ui/core';
import { Sessions } from 'alta-jsapi';

import { Forms } from './formRequests';

import ExtendedTable from "components/ExtendedTable/ExtendedTable.jsx";

var minDate = new Date(1900, 0);

const tableColumns =
[
    { id: "id", name: "ID", field: "id", state: true },
    { id: "userId", name: "User ID", field: "userId", state: true },
    { id: "name", name: "User", field: "username", state: true },
    { id: "date", name: "Date", field: "submitted", state: true },
    { id: "resolved", name: "Resolved", field: item => { var date = new Date(item.processed); return date > minDate ? date.toUTCString() : "No"; }, state: true },
];

export default function Responses(props)
{
    var id = props.match.params.formId;
    
    let history = useHistory();

    var [items, setItems] = React.useState();
    var [error, setError] = React.useState();

    React.useEffect(() => 
    {
        var getItems = async () =>
        {
            var newItems = [];

            for await (var result of Forms.getResponses(id))
            {
                newItems = [...newItems, ...result];
            }

            setItems(newItems);
        }

        getItems();
    }, 
    [id]);

    if (!items)
    {
        if (!!error && error.statusCode == 404)
        {
            // return <Redirect to='/not_found'/>;
        }

        return <div>{!!error ? JSON.stringify(error) : "Loading..."}</div>
    }
    
    function goToResponse(response) {
        props.history.push("responses/" + response.id);
    }

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Grid item xs={12} sm={10} lg={8} xl={6} style={{ width: '100%' }}>
            <ExtendedTable
                defaultColumns={tableColumns}
                data={items}
                tableName={"Responses"}
                onRowClick={goToResponse}
                />
                {/* {items.map(item => <p key={item.id}>{JSON.stringify(item)}<Button href={`responses/${item.id}`}>View</Button></p>)} */}
            </Grid>
        </Grid>);
}