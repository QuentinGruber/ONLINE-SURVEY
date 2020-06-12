import FormReader from "./components/FormReader";
import FormApp from "./components/FormApp";
import App from "./App";
import Login from "./components/Login";
import Register from "./components/Register";
import FormResult from "./layout/Form/components/FormResult";
import Welcome from "./components/Welcome";

var routes = [
  {
    path: "*",
    component: Welcome,
    layout: "",
  },
  {
    path: "/all_component",
    component: App,
    layout: "/dev",
  },
  {
    path: "/graph",
    component: FormResult,
    layout: "/dev",
  },
  {
    path: "/new",
    component: FormApp,
    layout: "/form",
  },
  {
    path: "/*/edit",
    component: FormApp,
    layout: "/form",
  },
  {
    path: "/*",
    component: FormReader,
    layout: "/form",
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
