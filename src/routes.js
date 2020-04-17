// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Login from "@material-ui/icons/LockOpen";
// core components/views for Auth layout
import LoginPage from "views/AuthPages/LoginPage.jsx";
import ServersPage from "views/Servers/ServersPage.jsx";
import ServerViewer from "views/Servers/ServerViewer.jsx";
// import ServerGroups from "./views/Servers/ServerGroups";

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
    component: ServerViewer,
    layout: "/admin",
    hidden: true
  },
  {
    path: "/Servers",
    name: "All Servers",
    icon: Dashboard,
    component: ServersPage,
    layout: "/admin"
  },
];

export default dashboardRoutes;
