import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import routes from "../routes.js";

class Template extends React.Component {
  // Get layout's routes
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/template") {
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
    return (
      <>

        <Switch>
          {this.getRoutes(routes)}
          <Redirect from="*" to="/template/testos" />
        </Switch>

      </>
    );
  }
}

export default Template;