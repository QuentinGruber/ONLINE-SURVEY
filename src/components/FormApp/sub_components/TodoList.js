import React from 'react';
import TodoListItem from './TodoListItem'
class TodoList extends React.Component {

  render() {
    if (this.props.mode == "all") { // if current mode is "all"
      // display all items
      var items = this.props.items.map((item, index) => {
        return (
          <div className="no-transition" id="todo">
            <TodoListItem userole={this.props.userole} key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
          </div>
        );
      });
      return (
        <ul className="list-group no-transition"> {items} </ul>
      );
    }
    else if (this.props.mode == "DoneOnly") { // if current mode is "DoneOnly"
      var items = this.props.items.map((item, index) => {
        // display only items that are done
        if (item.done) {
          return (
            <div className="no-transition" id="todo">
              <TodoListItem userole={this.props.userole} key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
            </div>
          );
        }
      });
      return (
        <ul className="list-group no-transition"> {items} </ul>
      );
    }
    else if (this.props.mode == "TodoOnly") { // if current mode is "TodoOnly"
      var items = this.props.items.map((item, index) => {
        // display only items that aren't done
        if (!item.done) {
          return (
            <div className="no-transition" id="todo">
              <TodoListItem userole={this.props.userole} key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
            </div>
          );
        }
      });
      return (
        <ul className="list-group no-transition"> {items} </ul>
      );
    }
  }
}

export default TodoList;