import App from "./App"
import Login from "./component/Login"
import Register from "./component/Register"

var routes = [
  {
    path: "/all_component",
    component: App,
    layout: "/dev"
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
