import React from "react";

class RadioAnswer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <div className="radio-answer">
          <input
            type="radio"
            name={"Q_radio_" + this.props.index}
            disabled="disabled"
          ></input>
          <label
            className="radio-answer-input"
            contentEditable="true"
            data-placeholder="Exemple de réponse"
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
          <button
            onClick={() => {
              this.props.RemoveRadioButton(this.props.id);
            }}
          >
            -
          </button>
        </div>
      </>
    );
  }
}

export default RadioAnswer;
