import React from "react";
import PropTypes from "prop-types";

// @material-ui
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Email from "@material-ui/icons/Email";
import Check from "@material-ui/icons/Check";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

// login API
import { Sessions } from "alta-jsapi";
import loginPageStyle from "assets/jss/material-dashboard-react/views/loginPageStyle.jsx";

const errorMessage = "Wrong username or password, please check your details";
const welcomeMessage = "Please enter your username and password";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      failedLogin: false,
      checked: false,
      errors: {},
    };
  }

  componentDidMount() {
    Sessions.checkRemembered()
      .then(Sessions.ensureLoggedIn)
      .then(this.onLoggedIn.bind(this))
      .catch(console.error);
  }

  onLoggedIn() {
    var policies = Sessions.getPolicies();
    console.log(policies);
    if (policies.includes("mod")) {
      this.props.history.push("/admin/Moderator");
    } else {
      this.props.history.push("/admin/Servers");
    }
  }

  login = async (e) => {
    e.preventDefault();
    const formElements = e.target.elements;

    let username = formElements.namedItem("username").value;
    let password = formElements.namedItem("password").value;
    let hashedPassword = Sessions.hashPassword(password);

    try {
      console.log("username: " + username);
      console.log("password: " + hashedPassword);

      await Sessions.loginWithUsername(username, hashedPassword);

      if (this.state.checked) {
        Sessions.remember();
      }

      this.onLoggedIn();
    } catch ({ response }) {
      console.log("error");
      // update welcome message to error logging in
      this.setState({ failedLogin: true });
    }
  };

  handleToggle = (event, value) => {
    this.setState({
      checked: value,
    });
  };

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem>
            <h4 className={classes.textCenter} style={{ marginTop: 0 }}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="primary"
              >
                <h4 className={classes.cardTitle}>
                  {this.state.failedLogin ? (
                    <span>{errorMessage}</span>
                  ) : (
                    <span>{welcomeMessage}</span>
                  )}
                </h4>
              </CardHeader>
            </h4>
          </GridItem>
        </GridContainer>

        <GridContainer justify="center">
          <GridItem xs={12} sm={8} md={5}>
            <form onSubmit={this.login}>
              <Card className={classes[this.state.cardAnimaton]}>
                <CardBody>
                  <CustomInput
                    labelText="Username..."
                    id="username"
                    error={errors.username || errors.invalidEmailOrPassword}
                    formControlProps={{
                      fullWidth: true,
                      className: classes.formControlClassName,
                    }}
                    inputProps={{
                      name: "username",
                      required: true,
                      style: { width: "100%" },
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <CustomInput
                    labelText="Password"
                    id="password"
                    error={errors.password || errors.invalidEmailOrPassword}
                    formControlProps={{
                      fullWidth: true,
                      className: classes.formControlClassName,
                    }}
                    inputProps={{
                      name: "password",
                      type: "password",
                      required: true,
                      style: { width: "100%" },
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputAdornmentIcon}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormControlLabel
                    classes={{
                      root:
                        classes.checkboxLabelControl +
                        " " +
                        classes.checkboxLabelControlClassName,
                      label: classes.checkboxLabel,
                    }}
                    control={
                      <Checkbox
                        tabIndex={-1}
                        onChange={this.handleToggle}
                        checkedIcon={<Check className={classes.checkedIcon} />}
                        icon={<Check className={classes.uncheckedIcon} />}
                        classes={{
                          checked: classes.checked,
                          root: classes.checkRoot,
                        }}
                      />
                    }
                    label={<span>Remember me</span>}
                  />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button
                    type="submit"
                    color="success"
                    variant="contained"
                    size="lg"
                    block
                  >
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
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
  errors: PropTypes.object,
};

export default withStyles(loginPageStyle)(LoginPage);
