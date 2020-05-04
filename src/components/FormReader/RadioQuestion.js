import React from "react";

class RadioQuestion extends React.Component {
  render() {
    var items = [];
    for (let i = 0; i < this.props.data.p_answer.length; i++) {
      if (this.props.data.p_answer[i].checked) {
        items.push(
          <>
            <input type="radio" name={this.props.data.title} defaultChecked />
            <label>{this.props.data.p_answer[i].text}</label>
          </>
        );
      } else {
        items.push(
          <>
            <input type="radio" name={this.props.data.title} />
            <label>{this.props.data.p_answer[i].text}</label>
          </>
        );
      }
    }
    return (
      <>
        <h3>{this.props.data.title}</h3>
        {items}
      </>
    );
  }
}

export default RadioQuestion;
