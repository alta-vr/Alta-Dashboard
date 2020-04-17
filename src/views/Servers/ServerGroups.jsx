import React, { Component } from 'react'
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx"
import CardHeader from "components/Card/CardHeader.jsx"
import CardBody from "components/Card/CardBody.jsx"

class ServerGroups extends Component {

    state ={
        view: "region"
    }

    render() {
        return (
            <div>
            <Card plain>
              <CardHeader plain color="primary">
                    Select a <h2>{this.state.view}</h2>
              </CardHeader>
              <CardBody>
              </CardBody>
            </Card>
                <GridContainer>
                    <GridItem>
                    </GridItem>
                </GridContainer>
            </div>
        )
    }
}

export default ServerGroups;
