import React from "react";
import { Button, Input } from "reactstrap";

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
    return (
      <>
        {/* If is a title */}
        {this.props.item.title != undefined && (
          // Display it
          <h2 className="no-transition section-todo-done">
            {this.props.item.value}
          </h2>
        )}
        {this.props.item.title == undefined && (
          // if not display item layout
          <li className="list-group-item card">
            <Input
              className="question"
              type="text"
              placeholder="Titre de la question"
              value={this.props.item.value}
              onChange={(e) =>
                this.props.handleChangeQuestionTitle(
                  e.target.value,
                  this.props.index
                )
              }
            />
            {/* type de reponse */}
            <Button
              type="button"
              className="close"
              onClick={this.onClickDelete}
            >
              Delete Question
            </Button>
          </li>
        )}
      </>
    );
  }
}

export default FormItem;
