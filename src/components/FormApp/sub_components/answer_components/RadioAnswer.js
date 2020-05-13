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
            contentEditable="true"
            suppressContentEditableWarning={true}
            onBlur={(e) => {
              this.props.HandleRadioTextChange(
                this.props.id,
                e.target.innerText
              );
            }}
          >
            {this.props.value}
          </label>
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
