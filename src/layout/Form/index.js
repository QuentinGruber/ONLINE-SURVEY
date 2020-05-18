import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import routes from "../../routes.js";

import { GlobalStyle } from "./styles";

import Axios from "axios";

class Form extends React.Component {
  // Get layout's routes
  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/form") {
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
  async componentDidMount() {
    try {
      // create an entry in our db
      let createList_promise = await Axios({
        method: "get",
        url: process.env.REACT_APP_API_URL + "/myform",
        withCredentials: true,
      });
      if (createList_promise.data != false) {
        console.log(createList_promise.data);
      } else {
        alert("You need to be connected !");
      }
      // if succeed redirect user to the question_list page
      // document.location.href = "/question_list/" + createList_promise.data.id;
    } catch (e) {
      console.error("Error while fetching user's forms! " + e);
    }
  }
  render() {
    return (
      <>
        <GlobalStyle />
        <div className="whiteDiv"></div>

        <div className="boxText">
          <div className="boxTextTitre">Online Survey</div>
          <div className="boxTextSlogan">Your forms, made simple</div>
        </div>

        <Switch>{this.getRoutes(routes)}</Switch>
      </>
    );
  }
}

export default Form;
