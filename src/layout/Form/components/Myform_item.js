import React from "react";

class FormTitle extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.data.name}</h2>
      </div>
    );
  }
}

export default FormTitle;
