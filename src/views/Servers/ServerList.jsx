import React, { useState } from "react";
import CardBody from "components/Card/CardBody.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import SearchBar from "components/SearchBar/SearchBar.jsx";
import ServerList from "components/Lists/ServerList.jsx";
import DropDownMenu from "components/Menu/DropDownMenu.jsx";
import SearchField from "components/ExtendedTable/SearchField.jsx";
import { Sessions, Servers } from "alta-jsapi";
import GridContainer from "../../components/Grid/GridContainer";
import { Container } from "@material-ui/core";
import GridItem from "../../components/Grid/GridItem";
import ViewWrapper from "../ViewWrapper";

const lists = [
  { func: Servers.getOpen, label: "Open" },
  { func: Servers.getConsoleServers, label: "Console" },
  { func: Servers.getControllable, label: "Controllable" },
  { func: Servers.getFavorites, label: "Favorites" },
  { func: Servers.getJoined, label: "Joined" },
  { func: Servers.getPublic, label: "Public" },
];

export default function ServersPage() {
  const [currentList, setCurrentList] = useState(lists[4]);
  const [filter, setFilter] = useState("");

  function getUsername() {
    return Sessions.getUsername();
  }

  function handleDropDown(event) {
    setCurrentList(event.target.value);
  }

  function handleSearchField(value) {
    console.log("Search input: ", value);
    setFilter(value);
  }

  return (
    <ViewWrapper
      title={`Welcome ${getUsername()}`}
      subtitle="Select a server to continue">
      <DropDownMenu
        title="server list"
        value={currentList}
        values={lists}
        handleChange={(event) => handleDropDown(event)}
      />
      <ServerList getListFunc={currentList.func} search={filter} />
    </ViewWrapper>
  );
}
