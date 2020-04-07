import React from 'react';
import { Button } from 'reactstrap'

class FormItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClickDelete = this.onClickDelete.bind(this);
  }
  onClickDelete() {
    var index = parseInt(this.props.index); // get item index
    this.props.removeItem(index); // remove it
  }
  render() {
    var ItemClass = this.props.item.done ?
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
            <span className={ItemClass + " no-transition"}>
              {this.props.item.value}
            </span>
            <Button type="button" className="close" onClick={this.onClickDelete}>&times;</Button>
          </li>
        }
      </>
    );
  }
}

export default FormItem;