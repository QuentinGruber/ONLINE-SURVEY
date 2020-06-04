import React from "react";
import { Card, Button } from "reactstrap";

class FormTitle extends React.Component {
  render() {
    return (
      <Card id="form-list-card-form">
        <div id="form-list-title">{this.props.data.name}</div>
      </Card>
    );
  }
}

export default FormTitle;
