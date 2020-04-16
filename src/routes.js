// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Login from "@material-ui/icons/LockOpen";
// core components/views for Auth layout
import LoginPage from "views/Pages/LoginPage.jsx";
import AltaServers from "views/AltaServers/AltaServers.jsx";
import ServerView from "views/AltaServers/ServerView.jsx";

const dashboardRoutes = [
  {
    path: "/login-page",
    name: "Login Page",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Login,
    component: LoginPage,
    layout: "/auth",
    hidden: true
  },
  {
    path: "/AltaServers/:serverId",
    name: "Alta Servers",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: ServerView,
    layout: "/admin",
    hidden: true
  },
  {
    path: "/AltaServers",
    name: "Alta Servers",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: AltaServers,
    layout: "/admin"
  },
];

export default dashboardRoutes;
