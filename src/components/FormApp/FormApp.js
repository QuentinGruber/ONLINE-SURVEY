import React from "react";
import FormTitle from "./sub_components/FormTitle";
import QuestionList from "./sub_components/QuestionList";
import NewQuestion from "./sub_components/NewQuestion";
import SaveForm from "./sub_components/SaveForm";
import Axios from "axios";
import { Input } from "reactstrap";
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
    this.CurrentUserRole = "1";
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
        if (createList_promise.data == true) {
          alert("Form created !");
        }
        // if succeed redirect user to the question_list page
        // document.location.href = "/question_list/" + createList_promise.data.id;
      } catch (e) {
        console.error("Error while saving a new question_list ! " + e);
      }
    } else {
      // if this isn't a new question_list
      if (this.state.FormName !== "") {
        // and his title isn't empty
        // update the current question_list
        Axios({
          method: "put",
          url: "http://127.0.0.1:8000/api/ToDoList/" + this.FormID,
          data: {
            title: this.state.FormName,
            closed: "0",
          },
        });
      }
    }
  }

  HandlePremadeAnswerChange(idx, type, NewValue) {
    // TODO: add type inside
    let temp_formitems = this.state.formitems;
    switch (type) {
      case "text":
        temp_formitems[idx].p_answer = NewValue;
        break;
      case "radio":
        console.log(NewValue);
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
    if (!this.isNew) {
      // if this isn't a new question_list
      // add a new entry in FormItem
      var createItem_promise = await Axios({
        method: "post",
        url: "/api/ToDoList/" + this.FormID + "/items",
        data: {
          id: this.FormID,
          content: Item.newItemValue,
        },
      });
      // add the item to formitems array
      formitems.push({
        id: createItem_promise.data, // add him is id
        index: formitems.length + 1,
        title: Item.newItemValue,
        required: false,
        type: "text",
      });
    } else {
      // if this is a new question_list
      // add the item to formitems array
      formitems.push({
        index: formitems.length + 1,
        title: Item.newItemValue,
        required: false,
        type: "nothing",
        p_answer: "",
      });
    }
    // update state
    this.setState({ formitems: formitems });
  }
  async removeItem(itemIndex) {
    if (!this.isNew) {
      // if this isn't a new question_list
      // delete the item entry in FormItem
      var deleteItem_promise = await Axios({
        method: "delete",
        url:
          "http://127.0.0.1:8000/api/ToDoList/items/" + formitems[itemIndex].id,
      });
    }
    // delete the item from formitems array
    formitems.splice(itemIndex, 1);

    //update state
    this.setState({ formitems: formitems });
  }

  async componentWillMount() {
    var pageURL = window.location.href;
    var lastURLSegment = pageURL.substr(pageURL.lastIndexOf("/") + 1);
    this.FormID = lastURLSegment;
    if (lastURLSegment === "new") {
      // if it's a new question list
      this.CurrentUserRole = "3"; // make current user the owner of the list
      formitems.push({
        index: 1,
        title: "Exemple de question",
        required: false,
        type: "nothing",
        p_answer: "",
      });
      this.setState({ formitems: formitems });
    } else {
      this.isNew = false; // change isNew boolean
      try {
        var question_list = await Axios({
          method: "get",
          url: "http://127.0.0.1:8000/api/ToDoList/" + this.FormID,
        });
      } catch (e) {
        // if request fail
        alert(
          "Todolist id : " +
            this.FormID +
            " do not exist or you don't have the rights access... redirecting"
        );
        // redirect user to /question_list/new
        document.location.href = "/question_list/new";
      }
      if (question_list.data === "Access Denied") {
        // if access denied
        alert(
          "Todolist id : " +
            this.FormID +
            " do not exist or you don't have the rights access... redirecting"
        );
        // redirect user to /question_list/new
        document.location.href = "/question_list/new";
      }
      // setup vars
      var contentList = []; // list of our content to push to formitems state
      var form_data = question_list.data.question; // shortcut for easier reading

      // check for any not done question
      for (let i = 0; i < form_data.length; i++) {
        if (form_data[i].state === 0) {
          // if the current item isn't done
          let item = {
            id: form_data[i].id,
            index: i,
            value: form_data[i].content,
            done: form_data[i].state,
          };
          formitems.push(item); // add it to the formitems array (state)
        }
      }
      // add "done" separator to the formitems array (state)
      formitems.push({
        index: contentList.length + 1,
        value: "Done",
        title: "true",
        done: "true",
      });

      // check for any done question
      for (let i = 0; i < form_data.length; i++) {
        let index = i + contentList.length;
        if (form_data[i].state === 1) {
          // if the current item is done
          let item = {
            id: form_data[i].id,
            index: index,
            value: form_data[i].content,
            done: form_data[i].state,
          };
          formitems.push(item); // add it to the formitems array (state)
        }
      }
      try {
        var CurrentUserRole_promise = await Axios({
          method: "get",
          url:
            "http://127.0.0.1:8000/api/ToDoListUser/" + this.FormID + "/role",
        });
        this.CurrentUserRole = CurrentUserRole_promise.data;
      } catch (e) {
        console.error("error while trying to get current user role ! " + e);
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
      <div id="main" className="card">
        {this.CurrentUserRole === "2" || this.CurrentUserRole === "3" ? (
          <FormTitle
            handleChangeTitle={this.handleChangeTitle}
            title={this.state.FormName}
          />
        ) : (
          <Input value={this.state.FormName} disabled></Input>
        )}
        <QuestionList
          userole={this.CurrentUserRole}
          items={formitems}
          ToogleRequireStateChange={this.ToogleRequireStateChange}
          removeItem={this.removeItem}
          handleChangeQuestionTitle={this.handleChangeQuestionTitle}
          HandleQuestionTypeChange={this.HandleQuestionTypeChange}
          HandlePremadeAnswerChange={this.HandlePremadeAnswerChange}
        />
        {this.CurrentUserRole === "2" || this.CurrentUserRole === "3" ? (
          <NewQuestion addItem={this.addItem} />
        ) : null}
        {this.isNew && <SaveForm save={this.saveItem} />}
        {(this.isNew !== true) & (this.CurrentUserRole === "3")
          ? {
              /* update form */
            }
          : null}
      </div>
    );
  }
}
export default FormApp;
