import FormReader from "./components/FormReader";
import FormApp from "./components/FormApp";
import Login from "./components/Login";
import Register from "./components/Register";
import Welcome from "./components/Welcome";

var routes = [
  {
    path: "*",
    component: Welcome,
    layout: "",
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
