import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";

import Menu from "@material-ui/icons/Menu";

// core components
import Button from "components/CustomButtons/Button";

import authNavbarStyle from "assets/jss/material-dashboard-react/components/authNavbarStyle.jsx";

class AuthNavbar extends React.Component {
  render() {
    const { classes, brandText } = this.props;

    return (
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.container}>
          <div className={{}}>
            <Button
              href="/"
              className={classes.title}
              color="transparent"
            >
              {brandText}
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

AuthNavbar.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  brandText: PropTypes.string,
};

export default withStyles(authNavbarStyle)(AuthNavbar);
