import React from "react";

// core components
import CardBody from "components/Card/CardBody.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import SearchBar from 'components/SearchBar/SearchBar.jsx'
import ServerList from 'components/Servers/ServerList.jsx'
import DropDownMenu from "components/Menu/DropDownMenu.jsx"

import { Sessions, Servers } from 'alta-jsapi';

const lists = [
  { func: Servers.getConsoleServers, label: "Console" },
  { func: Servers.getControllable, label: "Controllable" },
  { func: Servers.getJoined, label: "Joined" },
  { func: Servers.getOpen, label: "Open" },
  { func: Servers.getPublic, label: "Public" },
  { func: Servers.getFavorites, label: "Favorites" }
]

class ServersPage extends React.Component {

  state = {
    loading: false,
    currentList: lists[0],
    serverRegions: []
  };

  getUserID = () => {
    console.log("User ID: " + Sessions.getUserId())
    return Sessions.getUserId();
  }

  getUsername = () => {
    console.log("Username: " + Sessions.getUserId())
    return Sessions.getUsername();
  }

  // componentDidMount(){
  //   Servers.getRegions().then(regions => this.setState({ serverRegions : regions })).catch(e => console.log("Error: " + e));
  // }

  handleDropDown = (event) => {
    console.log("changed drop down");
    this.setState({currentList : event.target.value});
  }
  
  render() {
    return (
      <>
        <Card plain>
          <CardHeader color="primary">
            <h3>
              All {this.getUsername()}'s servers
              <hr></hr>
            </h3>
              <SearchBar searchFor />
          </CardHeader>
          <CardBody>
            list name: {this.state.currentList.label}
            <DropDownMenu values={lists} handleChange={(event) => this.handleDropDown(event)} />
          </CardBody>
        </Card>

        {/* insert a drop down that calls
        setState(this.state.list : newList) */}
        <ServerList getListFunc={this.state.currentList.func} />
      </>
    );
  };
};

ServersPage.propTypes = {
};

export default (ServersPage);
