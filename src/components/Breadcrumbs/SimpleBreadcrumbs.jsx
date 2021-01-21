import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect, Link as RouterLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
// import Breadcrumbs from '@bit/mui-org.material-ui.breadcrumbs';
import Link from '@material-ui/core/Link';

function SimpleBreadcrumbs({base}) {
  return (
    <Route>
      {({ location }) => {
        var path = location.pathname;

        if (!!base)
        {
            var searchPattern = new RegExp('^' + base);
            
            if (!searchPattern.test(path))
            {
                return null;
            }
            
            var match = path.match(searchPattern);

            path = path.replace(searchPattern, '');
        }

        let pathnames = path.split("/").filter(x => x);

        return (
          <Breadcrumbs aria-label="Breadcrumb">
            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1;
              const to = `${match || ''}${pathnames.slice(0, index + 1).join("/")}`;

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