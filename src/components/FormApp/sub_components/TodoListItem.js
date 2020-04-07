import React from 'react';
import { Button } from 'reactstrap'

class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
  }
  onClickDelete() {
    var index = parseInt(this.props.index); // get item index
    this.props.removeItem(index); // remove it
  }
  onClickDone() {
    var index = parseInt(this.props.index); // get item index
    this.props.markTodoDone(index); // mark it as done 
  }
  render() {
    var todoClass = this.props.item.done ?
      "done" : "undone";
    return (
      <>
        {/* If is a title */}
        {this.props.item.title != undefined &&
          // Display it
          <h2 className="no-transition section-todo-done">{this.props.item.value}</h2>
        }
        {this.props.item.title == undefined &&
          // if not display item layout
          <li className="list-group-item card">
            <span className={todoClass + " no-transition"}>
              {this.props.item.value}
              {this.props.userole == "2" || this.props.userole == "3" ?
              <>
              {this.props.item.done == 1 &&
                <Button className="glyphicon glyphicon-ok icon button-set-to" aria-hidden="true" onClick={this.onClickDone}>Set to : Undone</Button>
              }
              {this.props.item.done == 0 &&
                <Button className="glyphicon glyphicon-ok icon button-set-to" aria-hidden="true" onClick={this.onClickDone}>Set to : Done</Button>
              }

              
              </>:null
              }
            </span>
            <Button type="button" className="close" onClick={this.onClickDelete}>&times;</Button>
          </li>
        }
      </>
    );
  }
}

export default TodoListItem;