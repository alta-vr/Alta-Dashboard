// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Login from "@material-ui/icons/LockOpen";
import Poll from "@material-ui/icons/Poll";
// core components/views for Auth layout
import LoginPage from "views/AuthPages/LoginPage.jsx";
import ServerList from "views/Servers/ServerList.jsx";
import ServerDashboard from "views/Servers/ServerDashboard.jsx";
import ServerConsole from "views/Servers/ServerConsole.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import Moderator from "views/Moderator/Moderator.jsx";
import UserBans from "views/Moderator/Bans/UserBans";
import CreateBan from "views/Moderator/Bans/CreateBan";
import ViewBans from "views/Moderator/Bans/ViewBans";
import BanViewer from "views/Moderator/Bans/BanViewer";
import FormResponses from "views/Forms/Responses";
import FormResponse from "views/Forms/Response";
import FormRespond from "views/Forms/Respond";
import FormResponsesSummary from "views/Forms/ResponsesSummary";

// import ModeratorMenu from "views/UserProfile/Moderator";
// import ServerGroups from "./views/Servers/ServerGroups";

const dashboardRoutes = [
  {
    path: "/login-page",
    name: "Login Page",
    icon: Login,
    component: LoginPage,
    layout: "/auth",
    hidden: true,
  },
  {
    path: "/servers/:serverId/console",
    name: "Server Console",
    icon: Dashboard,
    component: ServerConsole,
    layout: "",
    hidden: true,
  },
  {
    path: "/servers/:serverId",
    name: "Server : serverId",
    icon: Dashboard,
    component: ServerDashboard,
    layout: "",
    hidden: true,
  },
  {
    path: "/servers",
    name: "Servers",
    icon: Dashboard,
    component: ServerList,
    layout: "",
  },
  {
    path: "/moderator/bans/view/:banId",
    name: "View bans",
    icon: Login,
    component: BanViewer,
    // menuComponents: ModeratorMenu,
    layout: "",
    hidden: true,
    isModOnly: true,
  },
  {
    path: "/moderator/bans/view",
    name: "View bans",
    icon: Login,
    component: ViewBans,
    // menuComponents: ModeratorMenu,
    layout: "",
    hidden: true,
    isModOnly: true,
  },
  {
    path: "/moderator/bans/create",
    name: "Create ban",
    icon: Login,
    component: CreateBan,
    // menuComponents: ModeratorMenu,
    layout: "",
    hidden: true,
    isModOnly: true,
  },
  {
    path: "/moderator/bans",
    name: "User bans",
    icon: Login,
    component: UserBans,
    // menuComponents: ModeratorMenu,
    layout: "",
    hidden: true,
    isModOnly: true,
  },
  {
    path: "/moderator",
    name: "Moderator",
    icon: Login,
    component: Moderator,
    // menuComponents: ModeratorMenu,
    layout: "",
    hidden: false,
    isModOnly: true,
  },
  {
    path: "/UserProfile/:userId",
    name: "User Profile",
    icon: Login,
    component: UserProfile,
    layout: "",
    hidden: true,
  },
  {
    path: "/:formId/responses/summary",
    name: "Form Responses Summary",
    icon: Poll,
    component: FormResponsesSummary,
    layout: "/forms",
    hidden: true,
  },
  {
    path: "/:formId/responses/:responseId",
    name: "Form Response",
    icon: Poll,
    component: FormResponse,
    layout: "/forms",
    hidden: true,
  },
  {
    path: "/:formId/responses",
    name: "Form Responses",
    icon: Poll,
    component: FormResponses,
    layout: "/forms",
    hidden: true,
  },
  {
    path: "/:formId",
    name: "Question Form",
    icon: Poll,
    component: FormRespond,
    layout: "/forms",
    hidden: true,
  },
];

export default dashboardRoutes;