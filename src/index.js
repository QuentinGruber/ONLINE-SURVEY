import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import DevLayout from "./layout/Dev.js";
import AuthLayout from "./layout/Auth.js";
import CookiesNeeded from "./component/CookiesNeeded.js"
import "./assets/css/argon-dashboard-react.css";
import "./assets/css/argon-dashboard-react.min.css";
import "./assets/css/argon-dashboard-react.css.map";

if(localStorage.AcceptCookies === "true"){
ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/dev" render={props => <DevLayout {...props} />} />
            <Route path="/auth" render={props => <AuthLayout {...props} />} />
            <Redirect from="/" to="/dev" />
        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);
}
else{
    ReactDOM.render(<CookiesNeeded />,document.getElementById("root"))
}




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();