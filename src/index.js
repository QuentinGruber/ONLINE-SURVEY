/* eslint-disable import/first */
import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import IsLogin from "./utils/islogin";
// import Layout / Route
const AuthLayout = lazy(() => import("./layout/Auth/"));
const Form = lazy(() => import("./layout/Form"));
const Legal = lazy(() => import("./components/Legal"));
import { LinkedInPopUp } from "react-linkedin-login-oauth2";
import CookiesNeeded from "./components/CookiesNeeded.js";
import Welcome from "./components/Welcome";

// import css
import "./assets/css/argon-dashboard-react.css";

import "bootstrap/dist/js/bootstrap.js";

// init Google Analytics
import ReactGA from "react-ga";

ReactGA.initialize("UA-160982162-1");
ReactGA.pageview(window.location.pathname + window.location.search);

if (localStorage.AcceptCookies === "true") {
  IsLogin().then((result) => {
    // Private route
    if (result === true) {
      ReactDOM.render(
        <BrowserRouter>
          <Suspense fallback={<div>Chargement...</div>}>
            <Switch>
              <Route exact path="/linkedin" component={LinkedInPopUp} />
              <Route
                path="/auth"
                render={(props) => <AuthLayout {...props} />}
              />
              <Route path="/form" render={(props) => <Form {...props} />} />
              <Route path="/legal" render={(props) => <Legal {...props} />} />
              <Redirect from="/" to="/form" />
            </Switch>
          </Suspense>
        </BrowserRouter>,
        document.getElementById("root")
      );
    } else {
      // Public route
      ReactDOM.render(
        <BrowserRouter>
          <Suspense fallback={<div>Chargement...</div>}>
            <Switch>
              <Route exact path="/linkedin" component={LinkedInPopUp} />
              <Route
                path="/auth"
                render={(props) => <AuthLayout {...props} />}
              />
              <Route path="/legal" render={(props) => <Legal {...props} />} />
              <Route
                exact
                path="/"
                render={(props) => <Welcome {...props} />}
              />
              <Redirect from="/" to="/" />
            </Switch>
          </Suspense>
        </BrowserRouter>,
        document.getElementById("root")
      );
    }
  });
} else {
  ReactDOM.render(<CookiesNeeded />, document.getElementById("root"));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
