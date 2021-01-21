import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import {
  Router,
  Route,
  Switch,
  Redirect,
  Link as RouterLink,
} from "react-router-dom";
import Admin from "layouts/Admin.jsx";
import Auth from "layouts/Auth.jsx";
import Forms from "layouts/Forms.jsx";
import { Sessions, setEndpoint } from "alta-jsapi";
import { withCookies } from "react-cookie";
import "assets/css/material-dashboard-react.css?v=1.6.0";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const hist = createBrowserHistory();

const SessionConnect = withCookies(
  (props) => Sessions.connectToCookies(props.cookies) || null
);

if (process.env.NODE_ENV == 'development')
{
    //setEndpoint('local');
}

ReactDOM.render(
  <div>
    <SessionConnect />
    <Router history={hist}>
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/forms" component={Forms} />
        <Redirect path="/admin/*" to="/*"/>
        <Route path="/" component={Admin} />
      </Switch>
    </Router>
  </div>,
  document.getElementById("root")
);
