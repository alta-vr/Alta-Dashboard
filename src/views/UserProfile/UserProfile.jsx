import React, { useState, useEffect } from "react";
import { Sessions } from "alta-jsapi";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "components/CustomButtons/Button";
import { useHistory } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import ServersPage from "views/Servers/ServersPage.jsx";

function UserProfile() {
  let history = useHistory();

  let [userInfo, setUserInfo] = useState({
    userName: "",
    userId: "",
    supporter: "",
    policies: [],
  });

  useEffect(() => {
    setUserInfo({
      userName: Sessions.getUsername(),
      userId: Sessions.getUserId(),
      supporter: Sessions.getSupporter(),
      policies: Sessions.getPolicies(),
    });
  }, []);

  function goBack() {
    history.goBack();
  }

  function showSupporter() {
    if (userInfo.supporter) {
      return "Yes, you legend!";
    } else {
      return "Nope :(";
    }
  }

  return (
    <div>
      <Button variant="contained" color="success" onClick={goBack}>
        Go Back
      </Button>
      <Card>
        <CardHeader plain color="primary">
          User Profile
        </CardHeader>
        <CardBody>Account Name: {userInfo.userName}</CardBody>
        <CardBody>Id: {userInfo.userId}</CardBody>
        <CardBody>Supporter: {showSupporter()}</CardBody>
        <CardBody>
          <List>
            Policies:
            {userInfo.policies.map((policy) => (
              <ListItem key={policy}>{policy}</ListItem>
            ))}
          </List>
        </CardBody>
      </Card>
    </div>
  );
}

export default UserProfile;
