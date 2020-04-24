import React from 'react'
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Container from '@material-ui/core/Container';

// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Check from "@material-ui/icons/Check";
import Face from "@material-ui/icons/Face";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import { useHistory } from 'react-router';
import { Users } from 'alta-jsapi'

export default function CreateBan() {

  const history = useHistory();

  let userInfo = {
    userID: "",

  }

  let handleBan = e => {
    e.preventDefault();
    const formElements = e.target.elements;
    const user = formElements['user'].value;
    // var func = Users.getInfo;

    // if (isNaN(user)){
    //     func = Users.getUserByUsername;
    // }

    // func(user).then().catch();

      // history.goBack();
  }
    
  return (
    <div>
        <Container><h2>Create Ban</h2></Container>
        <GridContainer>
          <GridItem alignItems="flex-end" alignContent="center">
            <form onSubmit={handleBan}>
              <Card style={{width: '800px'}}>
                <CardBody>
                  <CustomInput
                    labelText="Id..."
                    id="userid"
                    formControlProps={{
                      fullWidth: true,
                      className: ""
                    }}
                    inputProps={{
                      required: false,
                      name: "userid",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      )
                    }}
                  />
                  <CustomInput
                    labelText="Name..."
                    id="name"
                    formControlProps={{
                      fullWidth: true,
                      className: ""
                    }}
                    inputProps={{
                      required: false,
                      name: "username",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Face  />
                        </InputAdornment>
                      )
                    }}
                  />
                  <CustomInput
                    labelText="Duration..."
                    id="duration"
                    formControlProps={{
                      fullWidth: true,
                      className: ""
                    }}
                    inputProps={{
                      required: false,
                      name: "duration",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      )
                    }}
                  />
                  <CustomInput
                    labelText="Reason..."
                    id="reason"
                    formControlProps={{
                      fullWidth: true,
                      className: ""
                    }}
                    inputProps={{
                      required: false,
                      name: "reason",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      )
                    }}
                  />
                  <CustomInput
                    labelText="Type..."
                    id="type"
                    formControlProps={{
                      fullWidth: true,
                      className: ""
                    }}
                    inputProps={{
                      required: false,
                      name: "type",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      )
                    }}
                  />
                </CardBody>
                <CardFooter >
                  <Button type="submit" color="primary" simple size="lg" block>
                    Let's Go
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
    </div>
  )
}
