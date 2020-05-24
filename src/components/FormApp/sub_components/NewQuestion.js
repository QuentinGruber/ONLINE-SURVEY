import React from "react";

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
      <button
        onClick={this.CreateItem}
        className="btn btn-secondary button-add"
      >
        +
      </button>
    );
  }
}

export default NewQuestion;
