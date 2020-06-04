import React from "react";
import { Route, Switch } from "react-router-dom";

import routes from "../../routes.js";

import { GlobalStyle } from "./styles";

import Axios from "axios";

import MyFormItem from "./components/Myform_item";
import { Card } from "reactstrap";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }
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
      let myform_list_promise = await Axios({
        method: "get",
        url: process.env.REACT_APP_API_URL + "/myform",
        withCredentials: true,
      });
      if (myform_list_promise.data !== false) {
        let items = [];
        for (let i = 0; i < myform_list_promise.data.length; i++) {
          items.push(<MyFormItem key={i} data={myform_list_promise.data[i]} />);
        }
        this.setState({ items: items });
      } else {
        document.location.href = "/auth/";
        alert("You need to be connected !");
      }
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
        {document.location.href.substr(
          document.location.href.lastIndexOf("/")
        ) === "/form" && <Card className="form-list">{this.state.items}</Card>}
      </>
    );
  }
}

export default Form;
