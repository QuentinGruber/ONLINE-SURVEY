import React from "react";
import FormTitle from "./sub_components/FormTitle";
import QuestionList from "./sub_components/QuestionList";
import NewQuestion from "./sub_components/NewQuestion";
import SaveForm from "./sub_components/SaveForm";
import Axios from "axios";

import { GlobalStyle } from "./styles";

var formitems = [];

class FormApp extends React.Component {
  // Define attribute & function of FormApp
  constructor(props) {
    super(props);
    this.isNew = true; // by default the question_list is a new one
    this.FormID = 1; // the id of the current question_list
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeQuestionTitle = this.handleChangeQuestionTitle.bind(this);
    this.HandleQuestionTypeChange = this.HandleQuestionTypeChange.bind(this);
    this.HandlePremadeAnswerChange = this.HandlePremadeAnswerChange.bind(this);
    this.ToogleRequireStateChange = this.ToogleRequireStateChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.state = { formitems: formitems, mode: "all", FormName: "" };
  }

  async saveItem() {
    if (this.isNew) {
      // if this is a new question_list
      // register it
      try {
        // create an entry in our db
        let createList_promise = await Axios({
          method: "post",
          url: process.env.REACT_APP_API_URL + "/new_form",
          withCredentials: true,
          data: {
            title: this.state.FormName,
            content: this.state.formitems,
          },
        });
        if (createList_promise.data === true) {
          alert("Form created !");
        }
        // if succeed redirect user to the question_list page
        // document.location.href = "/question_list/" + createList_promise.data.id;
      } catch (e) {
        console.error("Error while saving a new form ! " + e);
      }
    } else {
      // if this isn't a new question_list
      if (this.state.FormName !== "") {
        try {
          let createList_promise = await Axios({
            method: "put",
            url: process.env.REACT_APP_API_URL + "/form/" + this.FormID,
            withCredentials: true,
            data: {
              title: this.state.FormName,
              content: this.state.formitems,
            },
          });
          if (createList_promise.data === true) {
            alert("Form created !");
          }
        } catch (e) {
          console.error("Error while saving a form ! " + e);
        }
      }
    }
  }

  HandlePremadeAnswerChange(idx, type, NewValue) {
    // TODO: add type inside
    let temp_formitems = this.state.formitems;
    switch (type) {
      case "text":
        break;
      case "radio":
        temp_formitems[idx].p_answer = NewValue;
        break;
      default:
        console.error(type + " is not an handled PremadeAnswer type");
        break;
    }

    this.setState({ formitems: temp_formitems });
  }

  ToogleRequireStateChange(idx) {
    // change title in component state
    let temp_formitems = this.state.formitems;
    if (temp_formitems[idx].required) {
      temp_formitems[idx].required = false;
    } else {
      temp_formitems[idx].required = true;
    }
    this.setState({ formitems: temp_formitems });
  }

  HandleQuestionTypeChange(idx, NewValue) {
    // change title in component state
    let temp_formitems = this.state.formitems;
    temp_formitems[idx].type = NewValue;
    this.setState({ formitems: temp_formitems });
  }

  handleChangeTitle(title) {
    // change title in component state
    this.setState({ FormName: title });
  }

  handleChangeQuestionTitle(title, idx) {
    // change title in component state
    let temp_formitems = this.state.formitems;
    temp_formitems[idx].title = title;
    this.setState({ formitems: temp_formitems });
  }

  async addItem(Item) {
    // add the item to formitems array
    formitems.push({
      index: formitems.length + 1,
      title: Item.newItemValue,
      required: false,
      type: "radio",
      p_answer: "",
    });
    // update state
    this.setState({ formitems: formitems });
  }

  async componentWillMount() {
    var pathArray = window.location.pathname.split("/");
    this.FormID = pathArray[2];
    if (this.FormID === "new") {
      // if it's a new form
      formitems.push({
        index: 1,
        title: "",
        required: false,
        type: "radio",
        p_answer: "",
      });
      this.setState({ formitems: formitems });
    } else {
      this.isNew = false; // change isNew boolean
      try {
        var question_list = await Axios({
          method: "get",
          url: process.env.REACT_APP_API_URL + "/form/" + this.FormID,
        });
      } catch (e) {
        // if request fail
        alert(
          "form id : " +
            this.FormID +
            " do not exist or you don't have the rights access... redirecting"
        );
        // redirect user to /form/new
        document.location.href = "/form/new";
      }

      // setup vars
      var form_data = question_list.data.content; // shortcut for easier reading

      // check for any not done question
      for (let i = 0; i < form_data.length; i++) {
        // if the current item isn't done
        let p_answer = [];
        for (let y = 0; y < form_data[i].p_answer.length; y++) {
          p_answer.push(form_data[i].p_answer[y]);
        }
        if (p_answer.length === 1) {
          p_answer = p_answer[0].text;
        }
        let item = {
          index: i,
          title: form_data[i].title,
          required: form_data[i].required,
          type: form_data[i].type,
          p_answer: p_answer,
        };
        formitems.push(item); // add it to the formitems array (state)
      }

      // update question_list title & question_list content
      this.setState({
        FormName: question_list.data.title,
        formitems: formitems,
      });
    }
  }

  render() {
    return (
      <>
        <GlobalStyle />
        <div id="main" className="fullCard bg-secondary shadow border-0">
          <FormTitle
            handleChangeTitle={this.handleChangeTitle}
            title={this.state.FormName}
          />
          <QuestionList
            items={formitems}
            ToogleRequireStateChange={this.ToogleRequireStateChange}
            removeItem={this.removeItem}
            handleChangeQuestionTitle={this.handleChangeQuestionTitle}
            HandleQuestionTypeChange={this.HandleQuestionTypeChange}
            HandlePremadeAnswerChange={this.HandlePremadeAnswerChange}
          />
          <NewQuestion addItem={this.addItem} />

          <div className="card-bottom">
            <SaveForm save={this.saveItem} />
          </div>
        </div>
      </>
    );
  }
}
export default FormApp;
