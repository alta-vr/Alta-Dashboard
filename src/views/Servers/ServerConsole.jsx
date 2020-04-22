import React from 'react'
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx"
import CardHeader from "components/Card/CardHeader.jsx"
import CardBody from "components/Card/CardBody.jsx"
//background image stuff
// import image from "assets/img/att_splashscreen.png";
// style={{backgroundImage: "url(" + image + ")"}}

function ServerConsole() {

    let history = useHistory();

    function goBack() {
        history.goBack();
    }  

    return (
        <div>
            <Button variant="contained" onClick={goBack}>Go Back</Button><br/>
            <Card plain>
            <CardHeader plain color="primary">
                    <h2>Console for server: </h2>
            </CardHeader>
            <CardBody>
            </CardBody>
            </Card>
            <GridContainer>
                <GridItem>
                    item
                </GridItem>
                <GridItem>
                    item
                </GridItem>
                <GridItem>
                    item
                </GridItem>
            </GridContainer>
        </div>
    )
}

export default ServerConsole;
