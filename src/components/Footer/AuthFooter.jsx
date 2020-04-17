import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import footerStyle from "assets/jss/material-dashboard-react/components/authFooterStyle.jsx";
// custom footer details
import FooterDetails from "components/Footer/FooterDetails.jsx"

function Footer({ ...props }) {
  const { classes } = props;
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>

        {/* links to be displayed at bottom left of page */}
        {/* <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="/admin/Servers" className={classes.block}>
                Home
              </a>
            </ListItem>
          </List>
        </div> */}
        
        <p className={classes.right}>
          <FooterDetails/>
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(footerStyle)(Footer);
