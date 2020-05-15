import React, { useState, useEffect } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import { Bans } from "alta-jsapi";
import GridContainer from "components/Grid/GridContainer.jsx";
import PopupDialog from "components/Notifications/PopupDialog.jsx";
import FormattedDate from "../../../components/Formats/FormattedDate";
import { Users } from "alta-jsapi";

export default function BanViewer(props) {
  let location = useLocation();
  let [banInfo, setBanInfo] = useState(location.banInfo);
  let { banId } = useParams();

  let history = useHistory();

  useEffect(() => {
    if (banInfo == undefined) {
      Bans.getBan(banId)
        .then((info) => {
          getUserName(info);
        })
        .then()
        .catch((e) => console.log("Error:", e));
    }
  }, [banInfo]);

  function getUserName(banInfo) {
    Users.getInfo(banInfo.user_id)
      .then((userInfo) => {
        setBanInfo({ ...banInfo, username: userInfo.username });
      })
      .catch((e) => console.log(e));
  }

  function getCreatorName(banInfo) {
    Users.getInfo(banInfo.created)
      .then((userInfo) => {
        console.log(userInfo);
        setBanInfo({ ...banInfo, username: userInfo.username });
      })
      .catch((e) => console.log(e));
  }

  function goBack() {
    history.goBack();
  }

  function handleDelete(response) {
    if (response) {
      Bans.deleteBan(banInfo.ban_id);
      history.push(location + "./ViewBans");
      return;
    }
    console.log("Cancelled");
  }

  if (banInfo === undefined)
    return (
      <div>
        Ban not found
        <Button variant="contained" color="success" onClick={goBack}>
          Go Back
        </Button>
      </div>
    );

  return (
    <div>
      <Button variant="contained" color="success" onClick={goBack}>
        Go Back
      </Button>
      <br />
      <GridContainer>
        <Card>
          <CardHeader plain color="primary">
            <h3>Ban ID: {banInfo.ban_id}</h3>
            <PopupDialog
              title={"Remove Ban"}
              info={
                "Are you sure you want to remove " +
                banInfo.username +
                "'s ban " +
                banInfo.ban_id +
                "?"
              }
              handleResponse={handleDelete}
            />
          </CardHeader>
          <CardBody>
            <h4>User ID: </h4>
            {banInfo.user_id ? banInfo.user_id : "N/A"}
            <h4>User Name: </h4>
            {banInfo.username ? banInfo.username : "N/A"}
            <h4>IP Address: </h4>
            {banInfo.ip_address ? banInfo.ip_address : "N/A"}
            <h4>Reason: </h4>
            {banInfo.reason ? banInfo.reason : "N/A"}
            <h4>Type: </h4>
            {banInfo.type ? banInfo.type : "N/A"}
            <h4>Created at:</h4>
            {banInfo.created_at ? (
              <FormattedDate date={banInfo.created_at} />
            ) : (
              "N/A"
            )}
            <h4>End time:</h4>
            {banInfo.end_time ? (
              <FormattedDate date={banInfo.end_time} />
            ) : (
              "N/A"
            )}
            <h4>Created by:</h4>
            {banInfo.createdUser ? banInfo.createdUser : "N/A"}
            {" with ID: "}
            {banInfo.created_by ? banInfo.created_by : "N/A"}
            <h4>Device ID: </h4>
            {banInfo.device_id ? banInfo.device_id : "N/A"}
            {banInfo.servers.length > 0 ? (
              <div>
                <h4>Servers: </h4>
                {banInfo.servers.map((server) => (
                  <ListItem>
                    Server: {server}
                    <br />
                  </ListItem>
                ))}
              </div>
            ) : (
              <></>
            )}
          </CardBody>
        </Card>
      </GridContainer>
    </div>
  );
}
