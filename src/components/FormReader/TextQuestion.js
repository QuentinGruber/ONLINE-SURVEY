import React from "react";

class TextQuestion extends React.Component {
  render() {
    return (
      <>
        <div className="list-group-item card-question">
          <div className="question">{this.props.data.title}</div>
          {this.props.data.required && (
            <label className="text-required">required</label>
          )}
          <input
            questionid={this.props.data.id}
            id={this.props.data.p_answer[0].id}
            type="text"
            placeholder={this.props.data.p_answer[0].text}
            required={true}
          ></input>
        </div>
      </>
    );
  }
}

export default TextQuestion;
