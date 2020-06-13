import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import routes from "../../routes.js";

import { GlobalStyle } from "./styles";

import TitleLogo from "./../../assets/img/logos/OS_white.png";

class Auth extends React.Component {
  // Get layout's routes
  getRoutes = (routes) => {
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
  getBrandText = (path) => {
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
        <GlobalStyle />
        <div className="whiteDiv"></div>

        <div className="boxText">
          <div className="boxTextTitre">
            <img
              src={TitleLogo}
              title="Online Survey"
              alt="Logo de Online Survey"
              className="title-logo"
              width="333px"
              height="66px"
            ></img>
          </div>
          <div className="boxTextSlogan">Your forms, made simple</div>
        </div>

        <Switch>
          {this.getRoutes(routes)}
          <Redirect from="*" to="/auth/login" />
        </Switch>
      </>
    );
  }
}

export default Auth;
