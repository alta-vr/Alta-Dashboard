import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import AuthNavbar from "components/Navbars/AuthNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import routes from "routes.js";
import pagesStyle from "assets/jss/material-dashboard-react/layouts/authStyle.jsx";
import image from "assets/img/att_splashscreen.png";
import withStyles from "@material-ui/core/styles/withStyles";

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
  </Switch>
);

class AuthPages extends React.Component {
  
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <AuthNavbar brandText="Alta VR" {...rest} />
          <div
            className={classes.fullPage}
            style={{ backgroundImage: "url(" + image + ")" }}
          >
            {switchRoutes}
            <Footer />
          </div>
      </div>
    );
  }
}

AuthPages.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(pagesStyle)(AuthPages);
