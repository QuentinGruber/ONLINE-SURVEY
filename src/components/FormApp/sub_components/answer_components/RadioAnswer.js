import React from "react";

class RadioAnswer extends React.Component {
  render() {
    return (
      <>
        <div className="radio-answer">
          <input
            type="radio"
            name={"Q_radio_" + this.props.index}
            disabled="disabled"
            className="radio-type-radio"
          ></input>
          <label
            className="radio-answer-input"
            contentEditable="true"
            data-placeholder="Option"
            suppressContentEditableWarning={true}
            onBlur={(e) => {
              this.props.HandleRadioTextChange(
                this.props.id,
                e.target.innerText
              );
            }}
            onKeyPress={(evt) => {
              if (evt.which === 13) {
                evt.preventDefault();
              }
            }}
            onPaste={(e) => {
              e.preventDefault();
              var text = e.clipboardData.getData("text/plain");
              text = text.replace(/(?:\r\n|\r|\n)/g, " ");
              document.execCommand("insertText", false, text);
            }}
          ></label>
          <div
            className="remove-option"
            onClick={() => {
              this.props.RemoveRadioButton(this.props.id);
            }}
          />
        </div>
      </>
    );
  }
}

export default RadioAnswer;
