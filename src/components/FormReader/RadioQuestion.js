import React from "react";

class RadioQuestion extends React.Component {
  render() {
    var items = [];
    for (let i = 0; i < this.props.data.p_answer.length; i++) {
      if (this.props.data.p_answer[i].checked) {
        items.push(
          <>
            <div className="radio-answer">
              <input
                questionid={this.props.data.id}
                id={this.props.data.p_answer[i].id}
                type="radio"
                name={this.props.data.title}
                defaultChecked
                className="radio-type-radio"
              />
              <label htmlFor={this.props.data.p_answer[i].id}>
                {this.props.data.p_answer[i].text}
              </label>
            </div>
          </>
        );
      } else {
        items.push(
          <>
            <div className="radio-answer">
              <input
                questionid={this.props.data.id}
                id={this.props.data.p_answer[i].id}
                type="radio"
                name={this.props.data.title}
                className="radio-type-radio"
              />
              <label htmlFor={this.props.data.p_answer[i].id}>
                {this.props.data.p_answer[i].text}
              </label>
            </div>
          </>
        );
      }
    }
    return (
      <>
        <div
          className={
            "list-group-item card-question " +
            (this.props.data.required
              ? "question-required"
              : "question-not-required")
          }
        >
          <div className="question">{this.props.data.title}</div>
          {items}
        </div>
      </>
    );
  }
}

export default RadioQuestion;
