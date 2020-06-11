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
    this.removeOption = this.removeOption.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.ItemsToDelete = [];
    this.OptionsToDelete = [];
    this.state = { formitems: formitems, mode: "all", FormName: "" };
    this.DefaultFormItem = {
      index: formitems.length + 1,
      title: "",
      required: false,
      type: "radio",
      p_answer: [{ text: " " }, { text: " " }],
    };
  }

  async saveItem() {
    if (this.state.formitems.length !== 0 && this.state.FormName !== "") {
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
            window.location.href = "/form";
          }
          // if succeed redirect user to the question_list page
          // document.location.href = "/question_list/" + createList_promise.data.id;
        } catch (e) {
          console.error("Error while saving a new form ! " + e);
        }
      } else {
        // if this isn't a new question_list
        let button = document.getElementsByClassName("save-form-button")[0];
        try {
          // Delete removed options from db
          for (let i = 0; i < this.OptionsToDelete.length; i++) {
            await Axios({
              method: "delete",
              url: process.env.REACT_APP_API_URL + "/question_option/",
              withCredentials: true,
              data: {
                FormID: this.FormID,
                id: this.OptionsToDelete[i],
              },
            });
          }

          // Delete removed questions from db
          for (let i = 0; i < this.ItemsToDelete.length; i++) {
            await Axios({
              method: "delete",
              url: process.env.REACT_APP_API_URL + "/form_item/",
              withCredentials: true,
              data: {
                FormID: this.FormID,
                id: this.ItemsToDelete[i],
              },
            });
          }
          let createList_promise = await Axios({
            method: "put",
            url: process.env.REACT_APP_API_URL + "/editform/",
            withCredentials: true,
            data: {
              FormID: this.FormID,
              title: this.state.FormName,
              content: this.state.formitems,
            },
          });
          if (createList_promise.data === true) {
            button.classList.toggle("green-bg", true);
            button.innerHTML = "Enregistré !";

            setTimeout(() => {
              button.classList.toggle("green-bg", false);
              button.innerHTML = "Enregistrer";
            }, 2000);
          }
        } catch (e) {
          button.classList.toggle("red-bg", true);
          button.innerHTML = "Erreur";

          setTimeout(() => {
            button.classList.toggle("red-bg", false);
            button.innerHTML = "Enregistrer";
          }, 2000);
        }
      }
    } else {
      let button = document.getElementsByClassName("save-form-button")[0];
      let title = document.getElementsByClassName("form-title")[0];
      button.classList.toggle("red-bg", true);
      button.innerHTML = "Erreur";

      if (title.innerHTML === "") {
        title.classList.toggle("red-border", true);
      }

      setTimeout(() => {
        button.classList.toggle("red-bg", false);
        button.innerHTML = "Enregistrer";
      }, 2000);
    }
  }

  HandlePremadeAnswerChange(idx, type, NewValue) {
    let temp_formitems = this.state.formitems;
    switch (type) {
      case "text":
        break;
      case "radio":
        temp_formitems[idx].p_answer = NewValue;
        break;
      case "checkbox":
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

    let elementTitle = document.getElementsByClassName("form-title")[0];
    elementTitle.classList.toggle("red-border", false);
  }

  handleChangeQuestionTitle(title, idx) {
    // change title in component state
    let temp_formitems = this.state.formitems;
    temp_formitems[idx].title = title;
    this.setState({ formitems: temp_formitems });
  }

  async addItem(Item) {
    // add the item to formitems array
    formitems.push(this.DefaultFormItem);
    // update state
    this.setState({ formitems: formitems });
  }

  async removeOption(itemID) {
    if (this.FormID !== "new") {
      this.OptionsToDelete.push(itemID);
    }
  }
  async removeItem(itemIndex, itemID) {
    if (this.FormID !== "new") {
      this.ItemsToDelete.push(itemID);
    }
    if (this.state.formitems.length > 1) {
      formitems.splice(itemIndex, 1);
      this.setState({ formitems: formitems });
    }
  }

  async componentWillMount() {
    var pathArray = window.location.pathname.split("/");
    this.FormID = pathArray[2];

    if (formitems.length !== 0) {
      formitems = [];
    }

    if (this.FormID === "new") {
      // if it's a new form
      formitems.push({
        index: formitems.length + 1,
        title: "",
        required: false,
        type: "radio",
        p_answer: [
          { text: " ", checked: false },
          { text: " ", checked: false },
        ],
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
        alert("Vous n'avez pas accès à ce formulaire.");
        // redirect user to /form/new
        document.location.href = "/form";
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
          id: form_data[i].id,
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
            removeOption={this.removeOption}
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
