import React from "react";

class TextQuestion extends React.Component {
  render() {
    return (
      <>
        <div className="list-group-item card-question">
          <div className="question">{this.props.data.title}</div>
          {this.props.data.required ? (
            <span className="text-required">*</span>
          ) : null}
          <input
            className="text-input"
            questionid={this.props.data.id}
            id={this.props.data.p_answer[0].id}
            type="text"
            placeholder="Réponse libre"
            autoComplete="off"
            required={this.props.data.required}
            onKeyPress={(evt) => {
              if (evt.which === 13) {
                evt.preventDefault();
              }
            }}
          ></input>
        </div>
      </>
    );
  }
}

export default TextQuestion;
