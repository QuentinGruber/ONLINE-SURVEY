import React from "react";
import { Button } from "reactstrap";

class SaveForm extends React.Component {
  render() {
    return <Button onClick={this.props.save}>Save</Button>;
  }
}

export default SaveForm;
