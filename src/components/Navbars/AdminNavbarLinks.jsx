import React from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import axios from "axios";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";

import { Sessions } from "alta-jsapi";

class HeaderLinks extends React.Component {
  state = {
    open: false,
    profilePopupOpen: false,
  };

  handleToggle = () => {
    this.setState((state) => ({ open: !state.open, profilePopupOpen: false }));
  };

  handleToggleProfile = () => {
    this.setState((state) => ({
      profilePopupOpen: !state.profilePopupOpen,
      open: false,
    }));
  };

  handleClose = (event) => {
    if (!!this.anchorEl && this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false, profilePopupOpen: false });
  };

  logout = () => {
    const { history } = this.props;
    try {
      Sessions.logout();
      history.push("/auth/login-page");
    } catch ({ request }) {
      console.log("Request:", request);
    }
  };

  render() {
    const { classes } = this.props;
    const { open, profilePopupOpen } = this.state;
    return (
      <div>
        {/* <div className={classes.manager}>
          <Button
            buttonRef={(node) => {
              this.anchorEl = node;
            }}
            color={window.innerWidth > 959 ? "transparent" : "white"}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-owns={open ? "menu-list-grow" : null}
            aria-haspopup="true"
            onClick={this.handleToggle}
            className={{}}
          >
            <Hidden smDown implementation="css">
              <Notifications className={classes.icons} />
              <p onClick={this.handleClick} className={classes.linkText}>
                Notification
              </p>
            </Hidden>
          </Button>
          <Poppers
            open={open}
            anchorEl={this.anchorEl}
            transition
            disablePortal
            className={
              classNames({ [classes.popperClose]: !open }) +
              " " +
              classes.pooperNav
            }
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList role="menu">
                      <MenuItem
                        onClick={this.handleClose}
                        className={classes.dropdownItem}
                      >
                        Mike John responded to your email
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Poppers>
        </div> */}
        <div className={classes.manager}>
          <Button
            color={window.innerWidth > 959 ? "transparent" : "white"}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-label="Person"
            aria-owns={profilePopupOpen ? "menu-list-grow" : null}
            aria-haspopup="true"
            onClick={this.handleToggleProfile}
            className={classes.buttonLink}
            buttonRef={(node) => {
              this.anchorEl = node;
            }}
          >
            <Person className={classes.icons} />
            <Hidden mdUp implementation="css">
              <p className={classes.linkText}>Profile</p>
            </Hidden>
          </Button>
          <Poppers
            open={profilePopupOpen}
            anchorEl={this.anchorEl}
            transition
            disablePortal
            className={
              classNames({ [classes.popperClose]: !profilePopupOpen }) +
              " " +
              classes.pooperNav
            }
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList role="menu">
                      <NavLink
                        to={"/admin/UserProfile/" + Sessions.getUserId()}
                      >
                        <MenuItem
                          onClick={this.handleClose}
                          className={classes.dropdownItem}
                        >
                          Profile
                        </MenuItem>
                      </NavLink>
                      <MenuItem
                        onClick={this.logout}
                        className={classes.dropdownItem}
                      >
                        Logout
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Poppers>
        </div>
      </div>
    );
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
