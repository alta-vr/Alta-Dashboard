import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.jsx";
import Auth from "layouts/Auth.jsx";
import { Sessions } from 'alta-jsapi';
import { CookiesProvider, withCookies } from 'react-cookie';

import "assets/css/material-dashboard-react.css?v=1.6.0";

const { Provider, Consumer } = React.createContext();
const hist = createBrowserHistory();
const state = {
  message: "message time"
}

const SessionConnect = withCookies(props => Sessions.connectToCookies(props.cookies) || null)

ReactDOM.render(
  <div>
  <SessionConnect/>
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
