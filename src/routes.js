import App from "./App"
import Login from "./component/Login"
import Register from "./component/Register"

var routes = [
  {
    path: "/testos",
    component: App,
    layout: "/template"
  },
  {
    path: "/login",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    component: Register,
    layout: "/auth"
  }
];
export default routes;
