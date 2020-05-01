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
import { Sessions } from "alta-jsapi";
import { withCookies } from "react-cookie";
import "assets/css/material-dashboard-react.css?v=1.6.0";

const hist = createBrowserHistory();

const SessionConnect = withCookies(
  (props) => Sessions.connectToCookies(props.cookies) || null
);

ReactDOM.render(
  <div>
    <SessionConnect />
    <Router history={hist}>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/auth" component={Auth} />
        <Redirect from="/" to="/auth/login-page" />
      </Switch>
    </Router>
  </div>,
  document.getElementById("root")
);
