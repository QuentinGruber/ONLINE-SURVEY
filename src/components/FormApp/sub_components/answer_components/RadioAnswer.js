import React from "react";
class RadioAnswer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.checked) {
      return (
        <>
          <input
            type="radio"
            name={"Q_radio_" + this.props.index}
            defaultChecked
          ></input>
          <input
            value={this.props.value}
            onChange={(e) => {
              this.props.HandleRadioTextChange(this.props.id, e.target.value);
            }}
          ></input>
          <button
            onClick={() => {
              this.props.RemoveRadioButton(this.props.id);
            }}
          >
            -
          </button>
        </>
      );
    } else {
      return (
        <>
          <input type="radio" name={"Q_radio_" + this.props.index}></input>
          <input
            value={this.props.value}
            onChange={(e) => {
              this.props.HandleRadioTextChange(this.props.id, e.target.value);
            }}
          ></input>
          <button
            onClick={() => {
              this.props.RemoveRadioButton(this.props.id);
            }}
          >
            -
          </button>
        </>
      );
    }
  }
}

export default RadioAnswer;
