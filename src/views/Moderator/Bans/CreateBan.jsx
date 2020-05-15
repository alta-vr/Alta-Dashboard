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
import { Bans, Servers } from "alta-jsapi";
import PopupDialog from "components/Notifications/PopupDialog.jsx";
import AutoCompleteDropDown from "components/Menu/AutoCompleteDropDown.jsx";
import Checkbox from "@material-ui/core/Checkbox";
import { CheckboxItem } from "components/ExtendedTable/CheckboxList.jsx";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const dropDownOptions = [
  // Check if value needs to be enum BanType
  { label: "Server", name: "Server" },
  { label: "Global", name: "Global" },
  { label: "Public", name: "Public" },
];

export default function CreateBan() {
  let [serverList, setServerList] = useState([]);
  let [validUser, setValidUser] = useState(false);
  let [isPermaBan, setIsPermaBan] = useState(false);
  let [addServer, setAddServer] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const [banInfo, setBanInfo] = useState({
    user: undefined,
    duration_hours: undefined,
    type: dropDownOptions[0].name,
    reason: undefined,
    method: 7,
    servers: [],
  });

  useEffect(() => {
    Servers.getAll()
      .then(setServerList)
      .then(console.log(serverList))
      .catch((e) => console.log("Error getting servers: ", e));
  }, []);

  useEffect(() => {
    if (banInfo.duration_hours != undefined) {
      if (banInfo.duration_hours > 999998) {
        setIsPermaBan(true);
      } else {
        setIsPermaBan(false);
      }
    }
  }, [banInfo.duration_hours]);

  function handleUserInput(userInfo) {
    if (userInfo == undefined) {
      setValidUser(false);
      setBanInfo({ ...banInfo, user: undefined });
      return;
    }

    setBanInfo({ ...banInfo, user: userInfo });
    setValidUser(true);
  }

  // function handleValidServer(server) {
  //   if (server == undefined) {
  //     console.log("serverId undefined");
  //     return;
  //   }
  //   var tempList = banInfo.servers;
  //   setAddServer(false);
  //   setBanInfo({ ...banInfo, servers: [...tempList, server.id] });
  // }

  function handleType(event) {
    setBanInfo({ ...banInfo, type: event.name });
  }

  // function handleAddServer() {
  //   console.log("Adding server: ");
  //   setAddServer(true);
  // }

  function handleRemoveServer(serverId) {
    var tempList = banInfo.servers;
    console.log("Removing server: ", serverId);
    if (serverId == undefined) {
      tempList = tempList.filter((id) => {
        return id != -1;
      });
      setBanInfo({ ...banInfo, servers: [...tempList] });
    }
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
    if (banInfo.duration_hours == undefined) {
      return;
    }
    var untilDate;
    var currentDate = new Date();
    untilDate = currentDate.setTime(
      currentDate.getTime() + banInfo.duration_hours * 60 * 60 * 1000
    );
    return currentDate.toLocaleString();
  }

  function handleConfirmation(response) {
    if (!response) {
      console.log("Cancelled");
      return;
    }

    var servers = undefined;
    if (banInfo.type == "Server") {
      if (banInfo.servers.length < 1) {
        alert("Must enter at least one server");
        return;
      }
      servers = banInfo.servers;
    }

    Bans.createBan(
      banInfo.user.id,
      banInfo.duration_hours,
      banInfo.type,
      banInfo.method,
      banInfo.reason,
      servers
    )
      .then((data) => {
        console.log("Data: ", data);
        history.push(location + "./../ViewBans/" + data.ban_id);
      })
      .catch((e) => {
        console.log("Create ban error: ", e);
        console.log("Create ban error code: ", e.statusCode);
        if (e.statusCode == 500) {
          alert("Cannot contain duplicate servers");
        }
      });
    console.log("location: ", location);
  }

  function handleBan(event) {
    event.preventDefault();
  }

  function handleSelectedServer(value) {
    console.log("Value in create ban: ", value);
    if (value) {
      setBanInfo({ ...banInfo, servers: [...banInfo.servers, value.id] });
    }
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

  function handleCheckbox() {
    console.log("Checkbox changed");
    console.log("permaban is ", isPermaBan);
    if (isPermaBan == false) {
      banInfo.duration_hours = 9999999;
      setIsPermaBan(true);
    } else {
      banInfo.duration_hours = undefined;
      setIsPermaBan(false);
    }
  }

  function goBack() {
    history.goBack();
  }

  return (
    <div>
      <Button variant="contained" color="success" onClick={goBack}>
        Go Back
      </Button>
      <br />
      <Container>
        <h2>Create Ban</h2>
      </Container>
      <GridContainer>
        <GridItem alignItems="flex-end" alignContent="center">
          <form onSubmit={handleBan}>
            <Card style={{ minWidth: "600px" }}>
              <CardBody fullwidth={true}>
                <UserInputField
                  fullwidth={true}
                  onValidateInput={handleUserInput}
                />
                {banInfo.duration_hours > 999998 ? (
                  <></>
                ) : (
                  <>
                    <CustomInput
                      fullwidth={true}
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
                    <label>Perma-Ban</label>
                  </>
                )}
                <Checkbox
                  onClick={handleCheckbox}
                  edge="start"
                  checked={isPermaBan}
                />
                {/* <CheckboxItem
                  value={[{ name: "permaBan", state: isPermaBan }]}
                  index={1}
                  handleToggle={handleCheckbox}
                  // renderButton={}
                /> */}
                {banInfo.duration_hours == undefined ? (
                  <></>
                ) : banInfo.duration_hours > 999998 ? (
                  <>
                    {() => setIsPermaBan(true)}
                    <label>Lasts FOREVER</label>
                  </>
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
                {banInfo.type == "Server" ? (
                  <>
                    {banInfo.servers.map((serverId) => (
                      <div>
                        <label>{serverId}</label>{" "}
                        <IconButton
                          onClick={() => handleRemoveServer(serverId)}
                          aria-label="delete"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </div>
                    ))}
                    <div>
                      <AutoCompleteDropDown
                        style={{ maxHeight: "10px" }}
                        title={"server"}
                        list={serverList}
                        onChange={handleSelectedServer}
                      />
                      {/* <Button
                        variant="contained"
                        size="medium"
                        onClick={handleAddServer}
                      >
                        Add
                      </Button> */}
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </CardBody>
              <CardFooter>
                {validUser ? (
                  <PopupDialog
                    title={"Create Ban"}
                    info={`Are you sure you want to ban ${
                      banInfo.user.username
                    } for ${banInfo.reason}?`}
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
