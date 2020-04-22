/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Navbar from "components/Navbars/Navbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import { Button } from "@material-ui/core";

import routes from "routes.js";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "assets/img/att_splashscreen.png";
import logo from "assets/img/Alta_Logo_Light.png";

const logoText = "Alta VR";
let userInfo = {};

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={props => {
              const Component = prop.component;
              return <Component {...props} {...userInfo}/>
            }}
            key={key}
          />
        );
      }
    })}
  </Switch>
);

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: image,
      color: "green",
      hasImage: true,
      fixedClasses: "dropdown show",
      mobileOpen: false,      
    };
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }

  render() {
    const { classes, ...rest } = this.props;

    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={routes}
          logoText={logoText}
          logo={logo}
          image={this.state.image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color={this.state.color}
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Navbar
            routes={routes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
          <Footer />
        </div>

      </div>
    );
  }
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Admin);
