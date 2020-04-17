// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Login from "@material-ui/icons/LockOpen";
// core components/views for Auth layout
import LoginPage from "views/AuthPages/LoginPage.jsx";
import AltaServers from "views/Servers/AltaServers.jsx";
import ServerView from "views/Servers/ServerView.jsx";

const dashboardRoutes = [
  {
    path: "/login-page",
    name: "Login Page",
    icon: Login,
    component: LoginPage,
    layout: "/auth",
    hidden: true
  },
  {
    path: "/Servers/:serverId",
    name: "Server : serverId",
    icon: Dashboard,
    component: ServerView,
    layout: "/admin",
    hidden: true
  },
  {
    path: "/Servers",
    name: "Township Tale Servers",
    icon: Dashboard,
    component: AltaServers,
    layout: "/admin"
  },
];

export default dashboardRoutes;
