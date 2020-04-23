// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Login from "@material-ui/icons/LockOpen";
// core components/views for Auth layout
import LoginPage from "views/AuthPages/LoginPage.jsx";
import ServersPage from "views/Servers/ServersPage.jsx";
import ServerViewer from "views/Servers/ServerViewer.jsx";
import ServerConsole from "views/Servers/ServerConsole.jsx";
import UserProfile from "views/UserProfile/UserProfile";
import Moderator from "views/UserProfile/Moderator";
import UserBans from "views/UserProfile/UserBans";

// import ModeratorMenu from "views/UserProfile/Moderator";
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
    path: "/Servers/:serverId/Console",
    name: "Server Console",
    icon: Dashboard,
    component: ServerConsole,
    layout: "/admin",
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
  {
    path: "/Moderator/UserBans",
    name: "User bans",
    icon: Login,
    component: UserBans,
    // menuComponents: ModeratorMenu,
    layout: "/admin",
    hidden: true,
    moderator: true
  },
  {
    path: "/Moderator",
    name: "Moderator",
    icon: Login,
    component: Moderator,
    // menuComponents: ModeratorMenu,
    layout: "/admin",
    hidden: false,
    moderator: true
  },
  {
    path: "/UserProfile",
    name: "User Profile",
    icon: Login,
    component: UserProfile,
    layout: "/admin",
    hidden: true
  }
];

export default dashboardRoutes;
