import React from 'react'
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { useHistory, useLocation } from 'react-router-dom';

export default function Moderator() {

  var history = useHistory();
  let currentPath = useLocation().pathname;

  function handleClick(event) {
    console.log("Clicked");
  }

  function goToBans(){
    console.log("go to bans");
    history.push(currentPath + "/UserBans");
  }

  function goToView(){
    console.log("go to view");
    // history.push();
  }

  function goToSecret(){
    console.log("go to secret");
    // history.push();
  }

  function goToNext(){
    console.log("go to next");
    // history.push();
  }

    function goBack() {
        history.goBack();
    }

  return (
    <div className="container">
        <Button variant="contained" onClick={goBack}>Go Back</Button>
      <Card plain>
        <CardHeader color="success">
          <h3>Moderator Dashboard</h3>
        </CardHeader>
      </Card>
      {/* style={{height : "200px"}} */}
      <GridContainer>
        <GridItem>
          <Button onClick={goToBans}>
              <Card>
                <CardHeader plain color="warning">
                  Ban user
                </CardHeader>
              </Card>
          </Button>
        </GridItem>
        <GridItem>
          <Button onClick={goToView}>
              <Card>
                <CardHeader plain color="success">
                  View user
                </CardHeader>
              </Card>
          </Button>
        </GridItem>
        <GridItem>
          <Button onClick={goToSecret}>
              <Card>
                <CardHeader plain color="success">
                  Secret users
                </CardHeader>
              </Card>
          </Button>
        </GridItem>
        <GridItem>
          <Button onClick={goToNext}>
              <Card>
                <CardHeader plain color="success">
                  What next?
                </CardHeader>
              </Card>
          </Button>
        </GridItem>
      </GridContainer>
    </div>
  )
}
