import React from "react";
import { Route, Switch, Link } from "react-router-dom";

import routes from "../../routes.js";

import { GlobalStyle } from "./styles";

import Axios from "axios";

import MyFormItem from "./components/Myform_item";
import { Card, Button } from "reactstrap";
import FormResult from "./components/FormResult.js";
import Disconnect from "./../../components/Disconnect";
import TitleLogo from "./../../assets/img/logos/OS_white.png";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], selected_item: undefined, myform_list: [] };
    this.remove_form = this.remove_form.bind(this);
    this.updt_selected_form_card = this.updt_selected_form_card.bind(this);
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

  remove_form(idx, id) {
    Axios({
      method: "delete",
      url: process.env.REACT_APP_API_URL + "/form/",
      withCredentials: true,
      data: { FormID: id },
    });
    let temp_item = this.state.myform_list;
    temp_item.splice(idx, 1);
    this.setState({ myform_list: temp_item });
  }

  updt_selected_form_card(NewItem) {
    this.setState({ selected_item: NewItem });
  }

  async componentDidMount() {
    try {
      // create an entry in our db
      let myform_list_promise = await Axios({
        method: "get",
        url: process.env.REACT_APP_API_URL + "/myform",
        withCredentials: true,
      });
      if (myform_list_promise.data !== false) {
        this.setState({ myform_list: myform_list_promise.data });
      } else {
        alert("Vous devez être connecté.");
        document.location.href = "/auth/";
      }
    } catch (e) {
      console.error("Error while fetching user's forms! " + e);
    }
  }
  render() {
    let items = [];
    for (let i = 0; i < this.state.myform_list.length; i++) {
      items.unshift(
        <MyFormItem
          key={i}
          idx={i}
          reverse_idx={this.state.myform_list.length - i - 1}
          updt_selected_form_card={this.updt_selected_form_card}
          remove_form={this.remove_form}
          id={this.state.myform_list[i].id}
          FormLink={
            "https://www.online-survey.app/form/" + this.state.myform_list[i].id
          }
          data={this.state.myform_list[i]}
        />
      );
    }
    return (
      <>
        <GlobalStyle />
        <Switch>{this.getRoutes(routes)}</Switch>
        {document.location.href.substr(
          document.location.href.lastIndexOf("/")
        ) === "/form" ? (
          <>
            <Disconnect />

            <div className="boxTextFormList">
              <div className="boxTextTitreFormList">
                <img
                  src={TitleLogo}
                  title="Online Survey"
                  alt="Logo de Online Survey"
                  className="title-logoFormList"
                  width="333px"
                  height="66px"
                ></img>
              </div>
              <div className="boxTextSloganFormList">
                Your forms, made simple
              </div>
            </div>
            <Card className="form-list-card">
              {this.state.myform_list.length > 0 ? (
                <>{items}</>
              ) : (
                <div>
                  {" "}
                  <div className="placeholder-forms-div">
                    Vous n'avez aucun formulaire. Cliquez sur le bouton
                    ci-dessous pour en créer un.
                  </div>
                </div>
              )}
            </Card>
            <Card className="add-form-card">
              <div className="container-button-new-form">
                <Link to="/form/new">
                  <Button
                    color="default"
                    outline
                    type="button"
                    className="button-new-form"
                  >
                    Nouveau formulaire
                  </Button>
                </Link>
              </div>
            </Card>

            {this.state.selected_item !== undefined ? (
              <FormResult form_data={this.state.selected_item} />
            ) : (
              <FormResult form_data={undefined} />
            )}
          </>
        ) : (
          <>
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
          </>
        )}
      </>
    );
  }
}

export default Form;
