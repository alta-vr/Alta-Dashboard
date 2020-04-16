import React from "react";
import PropTypes from "prop-types";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx"
import Button from "components/CustomButtons/Button.jsx";
//material ui
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Search from "@material-ui/icons/Search";
import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";

//API stuff
import { Servers, Sessions } from 'alta-jsapi';

const fields = [
  {label: "ID", name: "id"},
  {label: "Name", name: "name"},
  {label: "Region", name: "region"},
  {label: "Status", name: "server_status"},
];



class AltaServer extends React.Component {
  state = {
    loading: false,
    value: 0,
    servers: []
  };

  getUserID = () => {
    console.log("User ID: " + Sessions.getUserId())
    return Sessions.getUserId();
  }
  
  getServers = () => {
    Servers.getOpen().then(data => this.setState(
      { servers: data }
    )).catch(e => console.log("error: " +e));
  }

  componentDidMount(){
    console.log("mounted");
    this.getServers()
  }
  
  render() {
    // const { classes } = this.props;
    const classes = {};
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader plain color="primary">
              <h4>
                All servers for: <span>{this.getUserID()}</span>
              </h4>
              <div className={classes.searchBar}>
                <CustomInput
                  formControlProps={{
                    className: classes.margin + " " + classes.search
                  }}
                  inputProps={{
                    placeholder: "Search",
                    inputProps: {
                      "aria-label": "Search"
                    }
                  }}
                />
                <Button color="white" aria-label="edit" justIcon round>
                  <Search />
                </Button>
              </div>
            </CardHeader>
            <CardBody>


              {/* <Table
                tableHeaderColor="primary"
                tableHead={["ID", "Name", "Region", "Status"]}
                tableData={this.state.servers.map(server => [server.id, server.name, server.region, server.status])}
              /> */}
            </CardBody>
          </Card>
        </GridItem>
        <Table>
          <TableHead>
            <TableRow>
              {fields.map(field => {
                return (
                  <TableCell
                  >
                    {field.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              this.state.servers.map(server => 
                <TableRow >
                    {fields.map(field => <TableCell>{server[field.name]}</TableCell>)}
                </TableRow>
            )}
            <TableRow>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </GridContainer>
    );
  };
};

AltaServer.propTypes = {
};

export default (AltaServer);
