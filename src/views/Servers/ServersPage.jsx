import React from "react";

// core components
import CardBody from "components/Card/CardBody.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import SearchBar from 'components/SearchBar/SearchBar.jsx'
import ServerList from 'components/Servers/ServerList.jsx'
import DropDownMenu from "components/Menu/DropDownMenu.jsx"

import { Sessions, Servers } from 'alta-jsapi';

const listsNames = [
  { console: "Console" },
  { controllable: "Controllable"},
  { joined: "Joined"},
  {open: "Open"},
  {public: "Public"},
  {favorites: "Favorites"}
]

class ServersPage extends React.Component {

  state = {
    loading: false,
    list: "open",
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

  handleDropDown = () => {
   
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
            list name: {listsNames[this.state.list]}
            <DropDownMenu listNames={listsNames} handleChange={() => this.handleDropDown} />
          </CardBody>
        </Card>

        {/* insert a drop down that calls
        setState(this.state.list : newList) */}
        <ServerList list={this.state.list} />
      </>
    );
  };
};

ServersPage.propTypes = {
};

export default (ServersPage);
