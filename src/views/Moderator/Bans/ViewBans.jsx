import React, { useState, useEffect } from "react";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Container from "@material-ui/core/Container";
import DropDownMenu from "../../../components/Menu/DropDownMenu";
import BanList from "components/Lists/BanList.jsx";
import UserInputField from "components/Validator/UserInputField.jsx";
import { Bans } from "alta-jsapi";
import { useHistory } from "react-router-dom";
import { Grid, Select, MenuItem } from "@material-ui/core";

const listTypes = [
    // functions to get ban lists
    // { func: Bans.getAll, label: "All" },
    // { func: (event ) =>Bans.getModBans(event), label: "Created by" },
    // { func: getUserBans, label: "For user" },
    { label: "All", func: "all" },
    { label: "Created by", func: "by" },
    { label: "For user", func: "for" },
];

export default function UserBans()
{
    const [currentListType, setCurrentListType] = useState(listTypes[0].func);
    const [currentList, setCurrentList] = useState([]);
    const [userId, setUserId] = useState(undefined);

    function getAllBans()
    {
        Bans.getAll()
            .then((bans) => setCurrentList(bans))
            .catch((e) => setCurrentList([]));
    }

    function getUserBans(userId)
    {
        if (!userId)
        {
            setCurrentList([]);
            return;
        }

        Bans.getUserBans(userId)
            .then((bans) => setCurrentList(bans))
            .catch((e) => setCurrentList([]));
    }

    function getModBans(userId)
    {
        if (!userId)
        {
            setCurrentList([]);
            return;
        }

        Bans.getModBans(userId)
            .then((bans) => setCurrentList(bans))
            .catch((e) => setCurrentList([]));
    }

    function update(listType, user)
    {
        switch (listType)
        {
            case "all":
                getAllBans();
                break;
            case "by":
                getModBans(user);
                break;
            case "for":
                getUserBans(user);
                break;
        }
    }

    useEffect(() =>
    {
        update('all');
    }, []);


    function handleUserInput(userInfo)
    {
        if (userInfo == undefined)
        {
            setUserId(undefined);
            return;
        }

        setUserId(userInfo.id);
        update(currentListType, userInfo.id);
    }

    function handleDropDown(e)
    {
        setCurrentListType(e.target.value.func);
        update(e.target.value.func, userId);
    }

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
        >
            <Grid item xs={12} sm={10} lg={8} xl={6} style={{ width: '100%' }}>
                <BanList currentList={currentList}>
                    <Select
                        onChange={(banListType) => handleDropDown(banListType)}
                        defaultValue={listTypes[0]}
                    >
                        {listTypes.map((value) => (
                        <MenuItem value={value} key={value.label}>
                            {value.label}
                        </MenuItem>
                        ))}
                    </Select>
                    <UserInputField onValidateInput={handleUserInput} />
                </BanList>
            </Grid>
        </Grid>
    );
}
