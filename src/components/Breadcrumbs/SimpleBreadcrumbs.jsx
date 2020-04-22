import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect, Link as RouterLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
// import Breadcrumbs from '@bit/mui-org.material-ui.breadcrumbs';
import Link from '@material-ui/core/Link';

function SimpleBreadcrumbs() {
  return (
    <Route>
      {({ location }) => {
        let pathnames = location.pathname.split("/").filter(x => x);
        pathnames = pathnames.slice(1);
        return (
          <Breadcrumbs aria-label="Breadcrumb">
            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1;
              const to = `/admin/${pathnames.slice(0, index + 1).join("/")}`;

              return last ? (
                <Typography color="textPrimary" key={to}>
                  {value}
                </Typography>
              ) : (
                <RouterLink color="inherit" to={to} key={to}>
                  {value}
                </RouterLink>
              );
            })}
          </Breadcrumbs>
        );
      }}
    </Route>
  );
}

export default SimpleBreadcrumbs;