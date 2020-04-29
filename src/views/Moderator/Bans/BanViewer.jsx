import React, { useState, useEffect } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import { Button } from "@material-ui/core";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import { Servers } from "alta-jsapi";
import GridContainer from "components/Grid/GridContainer.jsx";
import PopupDialog from "components/Notifications/PopupDialog.jsx";

export default function BanViewer(props) {
  let { banInfo } = useLocation();

  console.log(banInfo);
  let history = useHistory();
  let currentPath = useLocation().pathname;

  function goBack() {
    history.goBack();
  }

  function handleDelete(response) {
    if (response) {
      console.log("DELETE");
      return;
    }
    console.log("Cancelled");
  }

  if (banInfo === undefined)
    return (
      <div>
        Ban not found
        <Button variant="contained" onClick={goBack}>
          Go Back
        </Button>
      </div>
    );

  return (
    <div className="container">
      <GridContainer>
        <Button variant="contained" onClick={goBack}>
          Go Back
        </Button>
      </GridContainer>
      <GridContainer>
        <Card>
          <CardHeader plain color="primary">
            <h3>Ban ID: {banInfo.ban_id}</h3>
            <PopupDialog
              title={"Remove Ban"}
              info={
                "Are you sure you want to remove ban " + banInfo.ban_id + "?"
              }
              handleResponse={handleDelete}
            />
          </CardHeader>
          <CardBody>
            <h4>User ID: {banInfo.user_id ? banInfo.user_id : "N/A"}</h4>
            <h4>
              IP Address: {banInfo.ip_address ? banInfo.ip_address : "N/A"}
            </h4>
            <h4>Reason: {banInfo.reason ? banInfo.reason : "N/A"}</h4>
            <h4>Type: {banInfo.type ? banInfo.type : "N/A"}</h4>
            <h4>
              Created at: {banInfo.created_at ? banInfo.created_at : "N/A"}
            </h4>
            <h4>End time: {banInfo.end_time ? banInfo.end_time : "N/A"}</h4>
            <h4>
              Created by: {banInfo.created_by ? banInfo.created_by : "N/A"}
            </h4>
            <h4>Device ID: {banInfo.device_id ? banInfo.device_id : "N/A"}</h4>
          </CardBody>
          <CardBody>
            <GridContainer>
              {banInfo.servers.map((server) => (
                <ListItem>
                  Server: {server}
                  <br />
                </ListItem>
              ))}
            </GridContainer>
          </CardBody>
        </Card>
      </GridContainer>
    </div>
  );
}
