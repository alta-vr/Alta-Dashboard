import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import AdminNavbarLinks from "./AdminNavbarLinks.jsx";
import Button from "components/CustomButtons/Button.jsx";

import SimpleBreadcrumbs from "components/Breadcrumbs/SimpleBreadcrumbs.jsx";

import headerStyle from "assets/jss/material-dashboard-react/components/headerStyle.jsx";

function Header({ ...props }) {
  const { history, classes, color, breadcrumbBase } = props;

  const appBarClasses = classNames({
    [" " + classes[color]]: color,
  });

  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <SimpleBreadcrumbs base={breadcrumbBase}/>
        </div>
        <Hidden smDown implementation="css">
          <AdminNavbarLinks history={history} />
        </Hidden>        
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
          </Hidden>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(headerStyle)(Header);
