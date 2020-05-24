import React from "react";

class NewQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(event) {
    event.preventDefault();
    // add new item
    let newItemValue = "";
    this.props.addItem({ newItemValue });
    this.refs.NewItemForm.reset(); // reset input value after adding new item
  }
  render() {
    return (
      <form ref="NewItemForm" onSubmit={this.onSubmit} className="form-inline">
        <button type="submit" className="btn btn-secondary button-add">
          +
        </button>
      </form>
    );
  }
}

export default NewQuestion;
