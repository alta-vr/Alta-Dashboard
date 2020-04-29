import React, { useRef } from "react";
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
// import { useHistory, useLocation } from 'react-router';
import UserInputField from "components/Validator/UserInputField.jsx";
import DropDownMenu from "../../../components/Menu/DropDownMenu";
import { Bans } from "alta-jsapi";

const dropDownOptions = [
  // Check if value needs to be enum BanType
  { label: "Server", name: "server" },
  { label: "Global", name: "global" },
];

export default function CreateBan() {
  var banInfo = {
    user: undefined, //whatever the UserInput returns
    duration_hours: "",
    type: "server",
    // method: formElements['method'].value,
    reason: "",
    method: 7,
    servers: [],
  };
  let validUser = false;

  function handleUserInput(userInfo) {
    if (userInfo == undefined) {
      validUser = false;
      return;
    }
    banInfo.user = userInfo;
    validUser = true;
  }

  function handleType(event) {
    banInfo.type = event.name;
    console.log("Baninfo: ", banInfo.type);
  }

  function clearFields() {
    window.location.reload(false);
  }

  function handleBan(event) {
    event.preventDefault();

    const formElements = event.target.elements;
    // banInfo.user = formElements["user"].value;
    banInfo.duration_hours = formElements["duration"].value;
    banInfo.reason = formElements["reason"].value;

    // method: formElements['method'].value,
    // servers: formElements['servers'].value

    if (!validUser) {
      // Show more text?
      console.log("Invalid user");
      return;
    }

    // Call API createBan
    // Display confirmation message
    console.log("Valid user: ", banInfo);
    Bans.createBan(
      banInfo.user.id,
      banInfo.duration_hours,
      banInfo.type,
      banInfo.method,
      banInfo.reason,
      banInfo.servers
    )
      .then((data) => console.log("Data: ", data))
      .catch((e) => console.log("Create ban error: ", e));
    // clearFields();
  }

  function formatDateTime() {
    var formatedDate = "";
    var currentDate = new Date();
    formatedDate += currentDate.getDay() + ", ";
    formatedDate += currentDate.getMonth() + ", ";
    formatedDate += currentDate.getYear();

    return formatedDate;
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
                <label>Lasts until: {formatDateTime()}</label>
                <CustomInput
                  labelText="Reason..."
                  id="reason"
                  formControlProps={{
                    fullWidth: true,
                    className: "",
                  }}
                  inputProps={{
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
              </CardBody>
              <CardFooter>
                <Button type="submit" color="primary" simple size="lg" block>
                  Let's Go
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
