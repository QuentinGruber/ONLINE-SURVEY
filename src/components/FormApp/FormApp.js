import React from 'react';
import ReactDOM from 'react-dom';
import FormTitle from './sub_components/FormTitle'
import QuestionList from './sub_components/QuestionList'
import NewQuestion from './sub_components/NewQuestion'
import SaveForm from './sub_components/SaveForm'
import Axios from 'axios';
import { Input } from 'reactstrap';
var formitems = [];

class FormApp extends React.Component {
  // Define attribute & function of FormApp
  constructor(props) {
    super(props);
    this.isNew = true; // by default the question_list is a new one
    this.FormID = 1; // the id of the current question_list
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeQuestionTitle = this.handleChangeQuestionTitle.bind(this);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.CurrentUserRole = "1";
    this.state = { formitems: formitems, mode: "all", FormName: "" };
  }

  async saveItem() {
    if (this.isNew) { // if this is a new question_list
      // register it
      try {
        // create an entry in our db
        let createList_promise = await Axios({
          method: 'post',
          url: '/api/ToDoList',
          data: {
            title: this.state.FormName,
            closed: '0',
            content: this.state.formitems
          },
        })
        // setup user role for this question_list
        let createRole_promise = await Axios({
          method: 'post',
          url: '/api/ToDoListUser',
          data: {
            to_do_list_id: createList_promise.data.id,
            role: "3"
          },
        })
        // if succeed redirect user to the question_list page
        document.location.href = "/question_list/" + createList_promise.data.id;
      }
      catch (e) { console.error("Error while saving a new question_list ! " + e) }
    }
    else { // if this isn't a new question_list
      if (this.state.FormName !== "") { // and his title isn't empty
        // update the current question_list
        Axios({
          method: 'put',
          url: 'http://127.0.0.1:8000/api/ToDoList/' + this.FormID,
          data: {
            title: this.state.FormName,
            closed: '0',
          },
        })
      }
    }
  }

  componentDidUpdate() {
    // when is not a new question_list 
    // Update the question_list every time something change
    if (!this.isNew) {
      this.saveItem()
    }
  }


  handleChangeTitle(title) { // change title in component state
    this.setState({ FormName: title });
  }

  handleChangeQuestionTitle(title,idx) { // change title in component state
    let temp_formitems = this.state.formitems;
    temp_formitems[idx].value = title;
    this.setState({ formitems: temp_formitems });
  }


  async addItem(Item) {

    if (!this.isNew) { // if this isn't a new question_list
      // add a new entry in FormItem
      var createItem_promise = await Axios({
        method: 'post',
        url: '/api/ToDoList/' + this.FormID + '/items',
        data: {
          id: this.FormID,
          content: Item.newItemValue
        },
      })
      // add the item to formitems array
      formitems.unshift({
        id: createItem_promise.data, // add him is id
        index: formitems.length + 1,
        value: Item.newItemValue,
        done: false
      });
    }
    else { // if this is a new question_list
      // add the item to formitems array
      formitems.unshift({
        index: formitems.length + 1,
        value: Item.newItemValue,
        done: false
      });
    }
    // update state
    this.setState({ formitems: formitems });
  }
  async removeItem(itemIndex) {
    if (!this.isNew) { // if this isn't a new question_list
    // delete the item entry in FormItem
    var deleteItem_promise = await Axios({
      method: 'delete',
      url: 'http://127.0.0.1:8000/api/ToDoList/items/' + formitems[itemIndex].id,
    })
  }
   // delete the item from formitems array
   formitems.splice(itemIndex, 1);

   //update state
   this.setState({ formitems: formitems });
  }


  async componentWillMount() {
    var pageURL = window.location.href;
    var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
    this.FormID = lastURLSegment
    if (lastURLSegment == "new") { // if it's a new question list
      this.CurrentUserRole = "3"; // make current user the owner of the list
      formitems.push({ index: 1, value: "Exemple de question", done: true });
      this.setState({ formitems: formitems });
    }
    else {
      this.isNew = false; // change isNew boolean
      try {
        var question_list = await Axios({
          method: 'get',
          url: 'http://127.0.0.1:8000/api/ToDoList/' + this.FormID,
        })
      }
      catch (e) { // if request fail
        alert("Todolist id : " + this.FormID + " do not exist or you don't have the rights access... redirecting")
        // redirect user to /question_list/new
        document.location.href = "/question_list/new";
      }
      if(question_list.data == "Access Denied"){ // if access denied
        alert("Todolist id : " + this.FormID + " do not exist or you don't have the rights access... redirecting")
        // redirect user to /question_list/new
        document.location.href = "/question_list/new";
      }
      // setup vars
      var contentList = [] // list of our content to push to formitems state
      var form_data = question_list.data.question; // shortcut for easier reading

      // check for any not done question
      for (let i = 0; i < form_data.length; i++) {
        if (form_data[i].state == 0) { // if the current item isn't done
          let item = { id: form_data[i].id, index: i, value: form_data[i].content, done: form_data[i].state }
          formitems.push(item); // add it to the formitems array (state)
        }
      }
      // add "done" separator to the formitems array (state)
      formitems.push({ index: contentList.length + 1, value: "Done", title: "true", done: "true" });

      // check for any done question
      for (let i = 0; i < form_data.length; i++) {
        let index = i + contentList.length;
        if (form_data[i].state == 1) {// if the current item is done
          let item = { id: form_data[i].id, index: index, value: form_data[i].content, done: form_data[i].state }
          formitems.push(item); // add it to the formitems array (state)
        }
      }
      try {
        var CurrentUserRole_promise = await Axios({
          method: 'get',
          url: 'http://127.0.0.1:8000/api/ToDoListUser/' + this.FormID + '/role'
        })
        this.CurrentUserRole = CurrentUserRole_promise.data;
      }
      catch (e) {
        console.error("error while trying to get current user role ! " + e)
      }

      // update question_list title & question_list content 
      this.setState({ FormName: question_list.data.title, formitems: formitems });
    }
  }

  render() {
    return (
      <div id="main" className="card">
        {this.CurrentUserRole == "2" || this.CurrentUserRole == "3" ?
          <FormTitle handleChangeTitle={this.handleChangeTitle} title={this.state.FormName} />
          : <Input value={this.state.FormName} disabled></Input>
        }
        <QuestionList userole={this.CurrentUserRole} items={formitems} removeItem={this.removeItem}
        handleChangeQuestionTitle={this.handleChangeQuestionTitle} />
        {this.CurrentUserRole == "2" || this.CurrentUserRole == "3" ?
          <NewQuestion addItem={this.addItem} /> : null
        }
        {this.isNew &&
          <SaveForm save={this.saveItem} />
        }
        {this.isNew != true & this.CurrentUserRole == "3" ?
          {/* update form */} : null
        }
      </div>
    );
  }
}
export default FormApp;