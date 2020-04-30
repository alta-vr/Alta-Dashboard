import React from "react";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { useHistory, useLocation } from "react-router-dom";
import SearchBar from "../../../components/SearchBar/SearchBar";
import Container from "@material-ui/core/Container";

export default function UserBans() {
  var history = useHistory();
  let currentPath = useLocation().pathname;

  function goToCreate() {
    console.log("go to bans");
    history.push(currentPath + "/CreateBan");
  }

  function goToView() {
    console.log("go to view ");
    history.push(currentPath + "/ViewBans");
  }

  return (
    <div>
      <Container>
        <h2>User Bans</h2>
      </Container>
      <GridContainer>
        <GridItem>
          <Button onClick={goToCreate}>
            <Card>
              <CardHeader plain color="warning">
                Create Ban
              </CardHeader>
            </Card>
          </Button>
        </GridItem>
        <GridItem>
          <Button onClick={goToView}>
            <Card>
              <CardHeader plain color="success">
                View Bans
              </CardHeader>
            </Card>
          </Button>
        </GridItem>
      </GridContainer>
    </div>
  );
}
