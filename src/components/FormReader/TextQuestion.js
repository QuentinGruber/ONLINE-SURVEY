import React from "react";

class TextQuestion extends React.Component {
  render() {
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
          <input
            className="text-input"
            questionid={this.props.data.id}
            id={this.props.data.p_answer[0].id}
            type="text"
            placeholder="Réponse libre"
            required={true}
          ></input>
        </div>
      </>
    );
  }
}

export default TextQuestion;
