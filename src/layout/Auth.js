import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import routes from "../routes.js";

import BackgroundAuth from '../component/sub_component/BackgroundAuth'

class Auth extends React.Component {
  // Get layout's routes
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  render() {
  require ('../assets/css/auth.css') // import CSS for /Auth only
    return (
      <>

        <Switch>
          {this.getRoutes(routes)}
          <Redirect from="*" to="/auth/login" />
        </Switch>

      </>
    );
  }
}

export default Auth;