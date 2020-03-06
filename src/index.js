import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import TemplateLayout from "./layout/Template.js";
import AuthLayout from "./layout/Auth.js";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/template" render={props => <TemplateLayout {...props} />} />
            <Route path="/auth" render={props => <AuthLayout {...props} />} />
            <Redirect from="/" to="/template" />
        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();