import React from "react";

class TextQuestion extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <h3>{this.props.data.title}</h3>
        <input type="text" placeholder={this.props.data.p_answer}></input>
      </>
    );
  }
}

export default TextQuestion;
