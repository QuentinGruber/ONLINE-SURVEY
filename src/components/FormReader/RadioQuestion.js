import React from "react";

class RadioQuestion extends React.Component {
  render() {
    var items = [];
    for (let i = 0; i < this.props.data.p_answer.length; i++) {
      if (this.props.data.p_answer[i].checked) {
        items.push(
          <>
            <input
              questionid={this.props.data.id}
              id={this.props.data.p_answer[i].id}
              type="radio"
              name={this.props.data.title}
              defaultChecked
            />
            <label htmlFor={this.props.data.p_answer[i].id}>
              {this.props.data.p_answer[i].text}
            </label>
          </>
        );
      } else {
        items.push(
          <>
            <input
              questionid={this.props.data.id}
              id={this.props.data.p_answer[i].id}
              type="radio"
              name={this.props.data.title}
            />
            <label htmlFor={this.props.data.p_answer[i].id}>
              {this.props.data.p_answer[i].text}
            </label>
          </>
        );
      }
    }
    return (
      <>
        <div className="list-group-item card-question">
          <div className="question">{this.props.data.title}</div>
          {this.props.data.required && (
            <label className="text-required">required</label>
          )}
          {items}
        </div>
      </>
    );
  }
}

export default RadioQuestion;
