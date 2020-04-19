import React from "react";
class RadioAnswer extends React.Component {
  render() {
    return (
      <>
        <input type="radio" name={"Q_radio_" + this.props.index}></input>
        <label contentEditable="true" suppressContentEditableWarning={true}>
          réponse {this.props.id + 1}
        </label>
      </>
    );
  }
}

export default RadioAnswer;
