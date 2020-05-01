import React from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import AdminNavbarLinks from "./AdminNavbarLinks.jsx";
import SimpleBreadcrumbs from "components/Breadcrumbs/SimpleBreadcrumbs.jsx";
import headerStyle from "assets/jss/material-dashboard-react/components/headerStyle.jsx";

function Header({ ...props }) {
  const { history, classes, color } = props;

  const appBarClasses = classNames({
    [" " + classes[color]]: color,
  });

  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* <Hidden mdUp implementation="css"> */}
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton> */}
          {/* </Hidden> */}
          <SimpleBreadcrumbs />
        </div>
        {/* <Hidden smDown implementation="css"> */}
        <AdminNavbarLinks history={history} />
        {/* </Hidden> */}
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(headerStyle)(Header);
