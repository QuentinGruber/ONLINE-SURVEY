import React from "react";

class CheckBoxQuestion extends React.Component {
  render() {
    var items = [];
    for (let i = 0; i < this.props.data.p_answer.length; i++) {
      if (this.props.data.p_answer[i].text !== "") {
        items.push(
          <>
            <div className="radio-answer">
              <input
                questionid={this.props.data.id}
                id={this.props.data.p_answer[i].id}
                type="checkbox"
                name={this.props.data.title}
                className="checkbox-type-checkbox"
                required={this.props.data.required}
              />
              <label
                htmlFor={this.props.data.p_answer[i].id}
                className="radio-label"
              >
                {this.props.data.p_answer[i].text}
              </label>
            </div>
          </>
        );
      }
    }
    return (
      <>
        <div className="list-group-item card-question">
          <div className="question">{this.props.data.title}</div>
          {this.props.data.required ? (
            <span className="text-required">*</span>
          ) : null}
          {items}
        </div>
      </>
    );
  }
}

export default CheckBoxQuestion;
