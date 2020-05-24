import React from "react";

class NewQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    // force focus to add new todo input
    this.refs.itemName.focus();
  }
  onSubmit(event) {
    event.preventDefault();
    var newItemValue = this.refs.itemName.value;

    if (newItemValue) {
      // add new item
      this.props.addItem({ newItemValue });
      this.refs.NewItemForm.reset(); // reset input value after adding new item
    }
  }
  render() {
    return (
      <form ref="NewItemForm" onSubmit={this.onSubmit} className="form-inline">
        <input
          type="text"
          ref="itemName"
          className="form-control input-add"
          placeholder="Nouvelle question"
        />
        <button type="submit" className="btn btn-secondary button-add">
          Ajouter
        </button>
      </form>
    );
  }
}

export default NewQuestion;
