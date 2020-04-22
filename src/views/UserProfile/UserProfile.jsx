import React, { useState,  useEffect } from "react";
import { Sessions } from 'alta-jsapi';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "components/CustomButtons/Button";

 function UserProfile() {

  // let userInfo = {
  //   userName: "",
  //   userId: "",
  //   supporter: "",
  //   policy: ""
  // }

  let [userInfo, setUserInfo] = useState({
    userName: "",
    userId: "",
    supporter: "",
    policies: []
  });

  useEffect(() => {
    setUserInfo({
      userName : Sessions.getUsername(),
      userId : Sessions.getUserId(),
      supporter : Sessions.getSupporter(),
      policies : Sessions.getPolicies()});
  }, [userInfo]);

  function showSupporter(){
    if (userInfo.supporter){
      return "Yes, you legend!";
    }
    else {
      return "Nope :(";
    }
  }

  function changeSupporter(){
    // setUserInfo({...userInfo, supporter : true});
    // console.log("Supporter: " + userInfo.supporter);
    // console.log("userInfo: " + userInfo.userName);
  }

  return (
    <div>
      {}
      {/* <Card>
        <CardHeader hidden={}>

        </CardHeader>
      </Card> */}
      <Card>
        <CardHeader plain color="primary">
          User Profile
        </CardHeader>
        <CardBody>
          Account Name: {userInfo.userName}
        </CardBody>
        <CardBody>
          Id: {userInfo.userId}
        </CardBody>
          <CardBody>
            Supporter: {showSupporter()}
            <Button onClick={changeSupporter}>Change supporter</Button>
          </CardBody>
        <CardBody>
          <List>
            Policies:
            {userInfo.policies.map(policy =>
            <ListItem key={policy}>
              {policy}
            </ListItem>
            )}
            </List>
        </CardBody>
      </Card>
    </div>
  )
}

export default UserProfile;