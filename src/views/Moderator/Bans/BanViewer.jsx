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
import { ServerCard, ProfileCard } from "../../../util/social";
import ViewWrapper from "../../ViewWrapper";
import { Redirect } from 'react-router';
import { Field } from "../../../dashboardModules/core/common";

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
      .catch((e) => { console.log(e); setBanInfo(null) });
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
  {
      return <p>Loading...</p>;
  }

  if (banInfo === null)
    return (
      <Redirect to='/not_found'/>
    );

  return (
    <ViewWrapper title={"Ban ID: " + banInfo.ban_id}>
            <Field label="User">
            <ProfileCard userId={banInfo.user_id} username={banInfo.username}/>
            </Field>
            <Field label="IP Address">
            {banInfo.ip_address ? banInfo.ip_address : "N/A"}
            </Field>
            <Field label="Reason">
            {banInfo.reason ? banInfo.reason : "N/A"}
            </Field>
            <Field label="Type">
            {banInfo.type ? banInfo.type : "N/A"}
            </Field>
            <Field label="Created at">
            {banInfo.created_at ? (
              <FormattedDate date={banInfo.created_at} />
            ) : (
              "N/A"
            )}
            </Field>
            <Field label="End time">
            {banInfo.end_time ? (
              <FormattedDate date={banInfo.end_time} />
            ) : (
              "N/A"
            )}
            </Field>
            <Field label="Created by">
            {banInfo.createdUser ? banInfo.createdUser : "N/A"}
            {" with ID: "}
            {banInfo.created_by ? banInfo.created_by : "N/A"}
            </Field>
            <Field label="Device ID">
            {banInfo.device_id ? banInfo.device_id : "N/A"}
            </Field>
                <Field label="Servers">
            {banInfo.servers.length > 0 ? (
              <div>
                {banInfo.servers.map((server) => (
                    <ServerCard key={server} serverId={server}/>
                ))}
              </div>
            ) : (
              "None"
            )}
            </Field>
            
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
    </ViewWrapper>
  );
}
