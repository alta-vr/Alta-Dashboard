import React from "react";
import classNames from "classnames";
import { NavLink, useHistory } from "react-router-dom";
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
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";
import { Sessions } from "alta-jsapi";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

// function Moderator() {

//   return (
//     <div>
//       Moderator Tabs
//       List of user options
//     </div>
//   )
// }

class ModeratorMenu extends React.Component {

  constructor(props){
    super(props);
    const {classes} = this.props;
  }

    state = {
      open: false,
      profilePopupOpen: false
    }
  

  handleToggle = () => {
    this.setState(state => ({ profilePopupOpen: !state.profilePopupOpen, open: false }));
  };

  handleClose = event => {
    if (this.buttonRef.contains(event.target)) {
      return;
    }

    this.setState({ open: false, profilePopupOpen: false });
  };

  menu = () => {
    const { classes } = this.props;
    const { open, profilePopupOpen } = this.state;
    return(
    <div>
    <div className="MuiListItemText-root Sidebar-itemText-16  Sidebar-whiteFont-17">
    <Button
        buttonRef={node => {
          this.buttonRef = node;
        }}
        color={window.innerWidth > 959 ? "transparent" : "white"}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-owns={open ? "menu-list-grow" : null}
        aria-haspopup="true"
        onClick={this.handleToggle}
        className={{}}
        // className={"MuiButtonBase-root MuiButton-root MuiButton-text RegularButton-button-95 RegularButton-white-96 RegularButton-simple-103 HeaderLinks-buttonLink-242"}
      >
      <Person className={classes.icons} />
      {/* <Hidden mdUp implementation="css"> */}
        <p className={{}}>Profile</p>
      {/* </Hidden> */}
    </Button>
    <Poppers
      open={profilePopupOpen}
      anchorEl={this.buttonRef}
      transition
      disablePortal
      className={{}
        // classNames({ [classes.popperClose]: !profilePopupOpen }) +
        // " " +
        // classes.pooperNav
      }
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          id="menu-list-grow"
          style={{
            transformOrigin:
              placement === "bottom" ? "center top" : "center bottom"
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={this.handleClose}>
              <MenuList role="menu">
                <NavLink to={"/admin/UserProfile/" + Sessions.getUserId()}>
                  <MenuItem
                    onClick={this.handleClose}
                    className={classes.dropdownItem}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={this.handleClose}
                    className={classes.dropdownItem}
                  >
                    Profile
                  </MenuItem>
                </NavLink>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Poppers>
  </div>
  </div>
    )
  }
  
  render(){
    const { classes } = this.props;
    return(
      // <List className={classes.list}>
        <NavLink
          to={"/admin/UserProfile/Moderator"}
          className={classes.item}
          activeClassName="active"
        >
        <ListItem button className={classes.itemLink }>
          <ListItemText
            primary={this.menu}
            className={classNames(classes.itemText)}
            disableTypography={true}
          />
        </ListItem>
        </NavLink>
        // </List>
    );
  }
}

export default withStyles(headerLinksStyle)(ModeratorMenu);
// export {
//   Moderator
// };
// withStyles(headerLinksStyle)(HeaderLinks)