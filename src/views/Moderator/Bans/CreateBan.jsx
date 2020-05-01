import React, { useState, useEffect } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Container from "@material-ui/core/Container";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import { useHistory, useLocation, useParams } from "react-router";
import UserInputField from "components/Validator/UserInputField.jsx";
import ServerInputField from "components/Validator/ServerInputField.jsx";
import DropDownMenu from "../../../components/Menu/DropDownMenu";
import { Bans } from "alta-jsapi";
import PopupDialog from "components/Notifications/PopupDialog.jsx";

const dropDownOptions = [
  // Check if value needs to be enum BanType
  { label: "Server", name: "server" },
  { label: "Global", name: "global" },
];

export default function CreateBan() {
  let [validUser, setValidUser] = useState(false);
  let [banType, setBanType] = useState("server");
  let [addServer, setAddServer] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  // let [selectedServers, setSelectedServers] = useState();
  // var selectedServer = 0;

  var [banInfo, setBanInfo] = useState({
    user: undefined,
    duration_hours: undefined,
    type: dropDownOptions[0].name,
    reason: undefined,
    method: 7,
    servers: [],
  });

  function handleUserInput(userInfo) {
    if (userInfo == undefined) {
      setValidUser(false);
      setBanInfo({ ...banInfo, user: undefined });
      return;
    }
    console.log("Valid user: ", userInfo);

    setBanInfo({ ...banInfo, user: userInfo });
    setValidUser(true);
  }

  function handleValidServer(server) {
    console.log("serverId: ", server.id);
    if (server == undefined) {
      console.log("serverId undefined");
      return;
    }
    var tempList = banInfo.servers;
    console.log("templist in validServer: ", tempList);
    // tempList = tempList.filter((id) => {
    //   return id != -1;
    // });
    setAddServer(false);
    // tempList = tempList.filter(filter);
    // var removeIndex = selectedServers.indexOf(-1);
    // console.log("removeindex: ", removeIndex);
    // tempList.splice(removeIndex, 1, serverId);
    // selectedServer = serverId;
    setBanInfo({ ...banInfo, servers: [...tempList, server.id] });
  }

  function handleType(event) {
    banInfo.type = event.name;
    setBanType(event.name);
  }

  function handleAddServer() {
    // selectedServer = event;
    console.log("Adding server: ");
    setAddServer(true);
    // setBanInfo({ ...banInfo, servers: [...banInfo.servers, -1] });
  }

  function handleRemoveServer(serverId) {
    var tempList = banInfo.servers;
    console.log("Removing server: ", serverId);
    if (serverId == undefined) {
      tempList = tempList.filter((id) => {
        return id != -1;
      });
      setBanInfo({ ...banInfo, servers: [...tempList] });
    }
    // selectedServer = event.name;
    console.log("current list before temp : ", tempList);
    tempList = tempList.filter((id) => {
      return id != serverId;
    });
    if (tempList.length < 1) {
      setAddServer(false);
    }
    console.log("tempList after : ", tempList);
    setBanInfo({ ...banInfo, servers: [...tempList] });
  }

  function handleDurationChange(input) {
    setBanInfo({ ...banInfo, duration_hours: input.target.value });
  }

  function handleReasonChange(input) {
    setBanInfo({ ...banInfo, reason: input.target.value });
  }

  function formatDateTime() {
    var untilDate;
    var currentDate = new Date();
    untilDate = currentDate.setTime(
      currentDate.getTime() + banInfo.duration_hours * 60 * 60 * 1000
    );
    return currentDate.toLocaleString();
  }

  function clearFields() {
    window.location.reload(false);
  }

  function handleConfirmation(response) {
    if (!response) {
      console.log("Cancelled");
      return;
    }
    console.log("Confirmed");
    // Call API createBan
    console.log("Valid user: ", banInfo);
    Bans.createBan(
      banInfo.user.id,
      banInfo.duration_hours,
      banInfo.type,
      banInfo.method,
      banInfo.reason,
      banInfo.servers
    )
      .then((data) => {
        console.log("Data: ", data);
        history.push(location + "./../ViewBans/" + data.ban_id);
      })
      .catch((e) => console.log("Create ban error: ", e));
    console.log("location: ", location);
  }

  function handleBan(event) {
    event.preventDefault();
  }

  function validateBanInfo() {
    console.log("Calling is ready");
    if (
      banInfo.user != undefined &&
      banInfo.duration_hours != undefined &&
      banInfo.reason != undefined
    ) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div>
      <Container>
        <h2>Create Ban</h2>
      </Container>
      <GridContainer>
        <GridItem alignItems="flex-end" alignContent="center">
          <form onSubmit={handleBan}>
            <Card style={{ width: "800px" }}>
              <CardBody>
                <UserInputField onValidateInput={handleUserInput} />
                <CustomInput
                  labelText="Duration..."
                  id="duration"
                  formControlProps={{
                    fullWidth: true,
                    className: "",
                  }}
                  inputProps={{
                    onChange: handleDurationChange,
                    required: true,
                    name: "duration",
                    type: "number",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon>lock_outline</Icon>
                      </InputAdornment>
                    ),
                  }}
                />
                {banInfo.duration_hours == undefined ? (
                  <></>
                ) : (
                  <label>Lasts until: {formatDateTime()}</label>
                )}
                <CustomInput
                  labelText="Reason..."
                  id="reason"
                  formControlProps={{
                    fullWidth: true,
                    className: "",
                  }}
                  inputProps={{
                    onChange: handleReasonChange,
                    required: true,
                    name: "reason",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon>lock_outline</Icon>
                      </InputAdornment>
                    ),
                  }}
                />
                <DropDownMenu
                  title={"type"}
                  handleChange={handleType}
                  values={dropDownOptions}
                />
                <br />
                {banInfo.type == "server" ? (
                  <>
                    {banInfo.servers.map((serverId) => (
                      <div>
                        <label>{serverId}</label>{" "}
                        <Button onClick={() => handleRemoveServer(serverId)}>
                          Remove
                        </Button>
                      </div>
                    ))}
                    {addServer ? (
                      <div>
                        <ServerInputField onValidateInput={handleValidServer} />
                        <br />
                      </div>
                    ) : (
                      <div />
                    )}
                    <Button onClick={handleAddServer}>Add</Button>
                  </>
                ) : (
                  <></>
                )}
              </CardBody>
              <CardFooter>
                {validUser ? (
                  <PopupDialog
                    title={"Create Ban"}
                    info={`Are you sure you want to ban user for ?`}
                    handleResponse={handleConfirmation}
                    isReady={validateBanInfo}
                  />
                ) : (
                  <></>
                )}
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
