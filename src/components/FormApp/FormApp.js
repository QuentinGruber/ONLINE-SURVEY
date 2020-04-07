import React from 'react';
import ReactDOM from 'react-dom';
import TodoListTitle from './sub_components/TodoListTitle'
import TodoList from './sub_components/TodoList'
import NewTodo from './sub_components/NewTodo'
import SaveTodoList from './sub_components/SaveTodoList'
import Axios from 'axios';
import { Input } from 'reactstrap';
var todoItems = [];

class TodoApp extends React.Component {
  // Define attribute & function of TodoApp
  constructor(props) {
    super(props);
    this.isNew = true; // by default the todolist is a new one
    this.TodoListID = 1; // the id of the current todolist
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.removeAllDoneItem = this.removeAllDoneItem.bind(this);
    this.UncheckALL = this.UncheckALL.bind(this);
    this.CurrentUserRole = "1";
    this.state = { todoItems: todoItems, mode: "all", ListName: "" };
  }

  async saveItem() {
    if (this.isNew) { // if this is a new todolist
      // register it
      try {
        // create an entry in our db
        let createList_promise = await Axios({
          method: 'post',
          url: '/api/ToDoList',
          data: {
            title: this.state.ListName,
            closed: '0',
            content: this.state.todoItems
          },
        })
        // setup user role for this todolist
        let createRole_promise = await Axios({
          method: 'post',
          url: '/api/ToDoListUser',
          data: {
            to_do_list_id: createList_promise.data.id,
            role: "3"
          },
        })
        // if succeed redirect user to the todolist page
        document.location.href = "/todolist/" + createList_promise.data.id;
      }
      catch (e) { console.error("Error while saving a new todolist ! " + e) }
    }
    else { // if this isn't a new todolist
      if (this.state.ListName !== "") { // and his title isn't empty
        // update the current todolist
        Axios({
          method: 'put',
          url: 'http://127.0.0.1:8000/api/ToDoList/' + this.TodoListID,
          data: {
            title: this.state.ListName,
            closed: '0',
          },
        })
      }
    }
  }

  componentDidUpdate() {
    // when is not a new todolist 
    // Update the todolist every time something change
    if (!this.isNew) {
      this.saveItem()
    }
  }


  handleChangeTitle(title) { // change title in component state
    this.setState({ ListName: title });
  }

  changeMode(NewMode) { // change current todolist mode ("all","todo only","done only")
    this.setState({ mode: NewMode });
  }

  async addItem(todoItem) {

    if (!this.isNew) { // if this isn't a new todolist
      // add a new entry in todolistitem
      var createItem_promise = await Axios({
        method: 'post',
        url: '/api/ToDoList/' + this.TodoListID + '/items',
        data: {
          id: this.TodoListID,
          content: todoItem.newItemValue
        },
      })
      // add the item to todoItems array
      todoItems.unshift({
        id: createItem_promise.data, // add him is id
        index: todoItems.length + 1,
        value: todoItem.newItemValue,
        done: false
      });
    }
    else { // if this is a new todolist
      // add the item to todoItems array
      todoItems.unshift({
        index: todoItems.length + 1,
        value: todoItem.newItemValue,
        done: false
      });
    }
    // update state
    this.setState({ todoItems: todoItems });
  }
  async removeItem(itemIndex) {
    if (!this.isNew) { // if this isn't a new todolist
    // delete the item entry in TodolistItem
    var deleteItem_promise = await Axios({
      method: 'delete',
      url: 'http://127.0.0.1:8000/api/ToDoList/items/' + todoItems[itemIndex].id,
    })
  }
   // delete the item from todoItems array
   todoItems.splice(itemIndex, 1);

   //update state
   this.setState({ todoItems: todoItems });
  }

  async removeAllDoneItem() {
    let todoItems_list = this.state.todoItems
    var Done_nb = 0; // number of done task to delete
    let Done_index; // index in the list of the first done item
    var todoDeleted = [];
    for (var i = 0; i < todoItems.length; i++) {
      if (todoItems_list[i].done == true && todoItems_list[i].title == undefined) {
        Done_nb++;
      }
      if (todoItems_list[i].title) { // if is done title
        Done_index = i + 1; // first done task is 1 index after the title
      }
    }
    if (Done_nb > 0) // if there at least one done task to delete
      for (var i = 0; i < Done_nb; i++) {
        todoDeleted.push(todoItems[Done_index + i].id)
      }
    todoItems_list.splice(Done_index, Done_nb) // delete all done task
    this.setState({ todoItems: todoItems_list });
    if (!this.isNew) {
    for (var i = 0; i < todoDeleted.length; i++) {
      var deleteItem_promise = await Axios({
        method: 'delete',
        url: 'http://127.0.0.1:8000/api/ToDoList/items/' + todoDeleted[i],
      })
    }
  }
  }

  async UncheckALL() {
    var todoToUnCheck = []
    for (var i = 0; i < todoItems.length; i++) {
      if (todoItems[i].done == true && todoItems[i].title == undefined) { // skip if title
        let todo = todoItems[i]
        todoToUnCheck.push(todo.id)
        todoItems.splice(i, 1);
        // insert a new one with same value at the begining of the array
        todo.done = false;
        todoItems.unshift(todo);
        this.setState({ todoItems: todoItems });
      }
    }

    for (var i = 0; i < todoToUnCheck.length; i++) {
      if (!this.isNew) {
        let DoneToggle_promise = await Axios({
          method: 'put',
          url: 'http://127.0.0.1:8000/api/items/' + todoToUnCheck[i],
        })
      }
    }
  }

  async markTodoDone(itemIndex) {
    // delete items
    let todo = todoItems[itemIndex];
    todoItems.splice(itemIndex, 1);
    // insert a new one with same value at the end of the array
    todo.done = !todo.done;
    todo.done ? todoItems.push(todo) : todoItems.unshift(todo);
    this.setState({ todoItems: todoItems });

    if (!this.isNew) {
      try {
        let DoneToggle_promise = await Axios({
          method: 'put',
          url: 'http://127.0.0.1:8000/api/items/' + todo.id,
        })
      }
      catch (e) {
        alert("Fail to update todo status ! " + e)
      }
    }
  }

  async componentWillMount() {
    var pageURL = window.location.href;
    var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
    this.TodoListID = lastURLSegment
    if (lastURLSegment == "new") { // if it's a new todo list
      this.CurrentUserRole = "3"; // make current user the owner of the list
      todoItems.push({ index: 1, value: "Exemple de question", done: true });
      this.setState({ todoItems: todoItems });
    }
    else {
      this.isNew = false; // change isNew boolean
      try {
        var todolist = await Axios({
          method: 'get',
          url: 'http://127.0.0.1:8000/api/ToDoList/' + this.TodoListID,
        })
      }
      catch (e) { // if request fail
        alert("Todolist id : " + this.TodoListID + " do not exist or you don't have the rights access... redirecting")
        // redirect user to /todolist/new
        document.location.href = "/todolist/new";
      }
      if(todolist.data == "Access Denied"){ // if access denied
        alert("Todolist id : " + this.TodoListID + " do not exist or you don't have the rights access... redirecting")
        // redirect user to /todolist/new
        document.location.href = "/todolist/new";
      }
      // setup vars
      var contentList = [] // list of our content to push to todoItems state
      var todos_data = todolist.data.todo; // shortcut for easier reading

      // check for any not done todo
      for (let i = 0; i < todos_data.length; i++) {
        if (todos_data[i].state == 0) { // if the current item isn't done
          let item = { id: todos_data[i].id, index: i, value: todos_data[i].content, done: todos_data[i].state }
          todoItems.push(item); // add it to the todoItems array (state)
        }
      }
      // add "done" separator to the todoItems array (state)
      todoItems.push({ index: contentList.length + 1, value: "Done", title: "true", done: "true" });

      // check for any done todo
      for (let i = 0; i < todos_data.length; i++) {
        let index = i + contentList.length;
        if (todos_data[i].state == 1) {// if the current item is done
          let item = { id: todos_data[i].id, index: index, value: todos_data[i].content, done: todos_data[i].state }
          todoItems.push(item); // add it to the todoItems array (state)
        }
      }
      try {
        var CurrentUserRole_promise = await Axios({
          method: 'get',
          url: 'http://127.0.0.1:8000/api/ToDoListUser/' + this.TodoListID + '/role'
        })
        this.CurrentUserRole = CurrentUserRole_promise.data;
      }
      catch (e) {
        console.error("error while trying to get current user role ! " + e)
      }

      // update todolist title & todolist content 
      this.setState({ ListName: todolist.data.title, todoItems: todoItems });
    }
  }

  render() {
    return (
      <div id="main" className="card">
        {this.CurrentUserRole == "2" || this.CurrentUserRole == "3" ?
          <TodoListTitle handleChangeTitle={this.handleChangeTitle} title={this.state.ListName} />
          : <Input value={this.state.ListName} disabled></Input>
        }
        <TodoList userole={this.CurrentUserRole} mode={this.state.mode} items={todoItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone} />
        {this.CurrentUserRole == "2" || this.CurrentUserRole == "3" ?
          <NewTodo addItem={this.addItem} /> : null
        }
        {this.isNew &&
          <SaveTodoList save={this.saveItem} />
        }
        {this.isNew != true & this.CurrentUserRole == "3" ?
          {/* update form */} : null
        }
      </div>
    );
  }
}
export default TodoApp;