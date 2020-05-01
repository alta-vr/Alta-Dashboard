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

export default function BanViewer(props) {
  let location = useLocation();
  let [banInfo, setBanInfo] = useState(location.banInfo);
  let { banId } = useParams();

  let history = useHistory();
  let currentPath = useLocation().pathname;

  useEffect(() => {
    console.log(banInfo);
    if (banInfo == undefined) {
      Bans.getBan(banId)
        .then((info) => {
          setBanInfo(info);
        })
        .catch((e) => console.log("Error:", e));
    }
  }, [banInfo]);

  function goBack() {
    history.goBack();
  }

  function handleDelete(response) {
    if (response) {
      Bans.deleteBan(banInfo.ban_id);
      history.goBack();
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
              Created at:{" "}
              {banInfo.created_at ? (
                <FormattedDate date={banInfo.created_at} />
              ) : (
                "N/A"
              )}
            </h4>
            <h4>
              End time:{" "}
              {banInfo.end_time ? (
                <FormattedDate date={banInfo.end_time} />
              ) : (
                "N/A"
              )}
            </h4>
            <h4>
              Created by: {banInfo.created_by ? banInfo.created_by : "N/A"}
            </h4>
            <h4>Device ID: {banInfo.device_id ? banInfo.device_id : "N/A"}</h4>
          </CardBody>
          <CardBody>
            <GridContainer>
              {banInfo.servers != undefined ? (
                banInfo.servers.map((server) => (
                  <ListItem>
                    Server: {server}
                    <br />
                  </ListItem>
                ))
              ) : (
                <div>No servers</div>
              )}
            </GridContainer>
          </CardBody>
        </Card>
      </GridContainer>
    </div>
  );
}
