import React, { useState,  useEffect } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Button } from "@material-ui/core";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import { Servers } from 'alta-jsapi';
import GridContainer from "components/Grid/GridContainer.jsx";

function ServerViewer () {

    let { serverId } = useParams();
    let history = useHistory();
    let currentPath = useLocation().pathname;

    let [server, setServer] = useState(undefined);
    let loading = true;

    useEffect( () => {
        Servers.getDetails(serverId)
        .then(setServer)
        .catch(e => console.log(e));
    }, [serverId]);

    function goBack() {
        history.goBack();
    }  

    function goToConsole() {
        history.push(currentPath + "/Console")
    }    

    if(server===undefined)
    
        return (
            <div>
                Server undefined <Button variant="contained" onClick={goBack}>Go Back</Button>
            </div>
        );
    
    return (
      <div className="container">
        <GridContainer>
            <Button variant="contained" onClick={goBack}>Go Back</Button>
            <Button variant="contained" onClick={goToConsole}>Console</Button>
        </GridContainer>
        <GridContainer>
            <Card>
                <CardHeader plain color="primary">
                    <h3>
                        Server name: {server.name} / ID: {server.id}
                    </h3>
                    <h4>
                        Server Status: {server.server_status}
                    </h4>
                    <h4>
                        Server Region: {server.region}
                    </h4>
                    {server.description}
                </CardHeader>
                <CardBody>
                    <GridContainer>
                        {console.log("Players: " + server.online_players)}
                        {(server.online_players).map(player => 
                                <ListItem>
                                    Player name: {player.username}
                                    <br></br>
                                    Player ID: {player.id}
                                </ListItem>
                                )}
                    </GridContainer>
                </CardBody>
            </Card>
        </GridContainer>
        </div>
    );

};

ServerViewer.propTypes = {
};

export default ServerViewer;
