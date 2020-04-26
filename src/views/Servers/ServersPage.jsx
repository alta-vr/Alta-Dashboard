import React, { useState } from "react";
import CardBody from "components/Card/CardBody.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import SearchBar from 'components/SearchBar/SearchBar.jsx'
import ServerList from 'components/Lists/ServerList.jsx'
import DropDownMenu from "components/Menu/DropDownMenu.jsx"
import { Sessions, Servers } from 'alta-jsapi';

const lists = [
  { func: Servers.getOpen, label: "Open" },
  { func: Servers.getConsoleServers, label: "Console" },
  { func: Servers.getControllable, label: "Controllable" },
  { func: Servers.getFavorites, label: "Favorites" },
  { func: Servers.getJoined, label: "Joined" },
  { func: Servers.getPublic, label: "Public" }
]

export default function ServersPage() {

  const [currentList, setCurrentList] = useState(lists[0]);

  function getUsername() {
    return Sessions.getUsername();
  }

  function handleDropDown (event) {
    setCurrentList(event.target.value);
  }
  
  return (
    <>
      <Card plain>
        <CardHeader color="primary">
          <h3>
            All {getUsername()}'s servers
            <hr></hr>
          </h3>
          <SearchBar searchFor="servers" />
        </CardHeader>
        <CardBody>
          <DropDownMenu
            title="server list"
            values={lists}
            handleChange={(event) => handleDropDown(event)}
          />
        </CardBody>
      </Card>
      <ServerList getListFunc={currentList.func} />
    </>
  );
};
