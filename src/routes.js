import Sidebar from "./components/Sidebar";
import Userpanel from "./components/UserPanel";
import App from "./App";
import Login from "./components/Login";
import Register from "./components/Register";

var routes = [
  {
    path: "/all_component",
    component: App,
    layout: "/dev",
  },
  {
    path: "/sidebar",
    component: Sidebar,
    layout: "/dev",
  },
  {
    path: "/userpanel",
    component: Userpanel,
    layout: "/dev",
  },
  {
    path: "/login",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    component: Register,
    layout: "/auth",
  },
];
export default routes;
