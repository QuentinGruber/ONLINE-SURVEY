import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

// import Layout / Route
import DevLayout from "./layout/Dev.js";
import AuthLayout from "./layout/Auth/index.js";
import { LinkedInPopUp } from "react-linkedin-login-oauth2";
import Legal from "./components/Legal";
import CookiesNeeded from "./components/CookiesNeeded.js";

// import css
import "./assets/css/argon-dashboard-react.css";

// init Google Analytics
import ReactGA from "react-ga";

ReactGA.initialize("UA-160982162-1");
ReactGA.pageview(window.location.pathname + window.location.search);

if (localStorage.AcceptCookies === "true") {
  ReactDOM.render(
    <BrowserRouter>
      <Switch>
        <Route exact path="/linkedin" component={LinkedInPopUp} />
        <Route path="/dev" render={(props) => <DevLayout {...props} />} />
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        <Route path="/legal" render={(props) => <Legal {...props} />} />
        <Redirect from="/" to="/dev" />
      </Switch>
    </BrowserRouter>,
    document.getElementById("root")
  );
} else {
  ReactDOM.render(<CookiesNeeded />, document.getElementById("root"));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
