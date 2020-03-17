import React from 'react';
import ReactDOM from 'react-dom';

var formItems = [];

class FormListTitle extends React.Component {

  render() {
    return <h1>{this.props.name}</h1>;
  }
}

class FormList extends React.Component {
  render() {
    var items = this.props.items.map((item, index) => {
      return (
        <FormListItem key={index} item={item} index={index} removeItem={this.props.removeItem} modifyItem={this.props.modifyItem} />
      );
    });
    return (
      <ul className="list-group"> {items} </ul>
    );
  }
}

class FormListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
    this.UpdateQuestionName = this.UpdateQuestionName.bind(this);
  }
  onClickClose() {
    var index = parseInt(this.props.index);
    this.props.removeItem(index);

  }
  UpdateQuestionName() {
    var index = parseInt(this.props.index);
    var NewValue = this.refs.QuestionValue.value
    this.props.modifyItem(index,NewValue,"QuestionName")
  }
  render() {
    return (
      <li className="list-group-item ">
        <div>
          <span>
            <input placeholder="Titre de la question" onChange={this.UpdateQuestionName} ref="QuestionValue"  required="" type="text" className="question form-control" />
          </span>
          <button type="button" className="close" onClick={this.onClickClose}>&times;</button>
        </div>
      </li>
    );
  }
}

class NewQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(event) {
    event.preventDefault();
      this.props.addItem();
  }
  render() {
    return (
      <form ref="NewItemForm" onSubmit={this.onSubmit} className="form-inline">
        <button type="submit" className="btn btn-default">Add</button>
      </form>
    );
  }
}

class FormApp extends React.Component {
  // Define attribute & function of FormApp
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.modifyItem = this.modifyItem.bind(this);
    this.state = { formItems: formItems };

  }
  modifyItem(ItemIndex,NewValue,ValueName) {
    console.log(ItemIndex,NewValue)
    if(ValueName === "QuestionName"){
      var formItemszebi = this.state.formItems.slice();
      formItemszebi[ItemIndex].name = NewValue;
    }
    this.setState((state) => {
      // Important: read `state` instead of `this.state` when updating.
      return { formItems: formItemszebi }
    });
  }
  addItem() {
    formItems.unshift({
      index: formItems.length + 1,
      name:"nomquestion",
      type:"1",
      value: "",
    });
    this.setState((state) => {
      // Important: read `state` instead of `this.state` when updating.
      return { formItems: formItems }
    });
    //ReactDOM.render(<FormApp initItems={formItems} />, document.getElementById('main')); // HACK
  }
  removeItem(itemIndex) {
    console.log("retire l'index : "+itemIndex+" avec la valeur :"+formItems[itemIndex].name)
    console.log("Formitem après la suppression : "+formItems)
    var arraydemerde = formItems
    arraydemerde.splice(itemIndex, 1);
    this.setState((state) => {
      // Important: read `state` instead of `this.state` when updating.
      return { formItems: arraydemerde }
    });
  }
  render() {
    return (
      <div id="main">
        <FormListTitle name="list-name" />
        <NewQuestion addItem={this.addItem} />
        <FormList items={this.props.initItems} removeItem={this.removeItem} modifyItem={this.modifyItem} />
      </div>
    );
  }
}
//export default FormApp
ReactDOM.render(<FormApp initItems={formItems}/>, document.getElementById('merde'));