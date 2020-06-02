import React from "react";
import { Button } from "reactstrap";

class NewQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.CreateItem = this.CreateItem.bind(this);
  }
  CreateItem() {
    // add new item
    let newItemValue = "";
    this.props.addItem({ newItemValue });
  }
  render() {
    return (
      <Button
        color="default"
        outline
        type="button"
        className="button-add"
        onClick={this.CreateItem}
      >
        Nouvelle question
      </Button>
    );
  }
}

export default NewQuestion;
