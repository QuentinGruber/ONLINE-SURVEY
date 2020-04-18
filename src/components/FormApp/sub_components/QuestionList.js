import React from "react";
import FormItem from "./FormItem";
class QuestionList extends React.Component {
  render() {
    // display all items
    var items = this.props.items.map((item, index) => {
      return (
        <div className="no-transition" id="question">
          <FormItem
            userole={this.props.userole}
            key={index}
            item={item}
            index={index}
            removeItem={this.props.removeItem}
            handleChangeQuestionTitle={this.props.handleChangeQuestionTitle}
          />
        </div>
      );
    });
    return <ul className="list-group no-transition"> {items} </ul>;
  }
}

export default QuestionList;
