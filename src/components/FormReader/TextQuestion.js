import React from "react";

class TextQuestion extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <h3>{this.props.data.title}</h3>
        <input
          questionid={this.props.data.id}
          id={this.props.data.p_answer[0].id}
          type="text"
          placeholder={this.props.data.p_answer[0].text}
        ></input>
      </>
    );
  }
}

export default TextQuestion;
