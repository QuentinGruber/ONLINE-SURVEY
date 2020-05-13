import React from "react";
class RadioAnswer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.checked) {
      return (
        <>
          <div className="radio-answer">
            <input
              type="radio"
              name={"Q_radio_" + this.props.index}
              defaultChecked
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
    } else {
      return (
        <>
          <div className="radio-answer">
            <input type="radio" name={"Q_radio_" + this.props.index}></input>
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
}

export default RadioAnswer;
