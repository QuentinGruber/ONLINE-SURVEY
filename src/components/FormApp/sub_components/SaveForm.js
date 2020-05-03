import React from "react";
import { Button } from "reactstrap";

class SaveForm extends React.Component {
  render() {
    return (
      <Button
        className="btn-icon SaveFormButton"
        color="default"
        onClick={this.props.save}
      >
        Save
      </Button>
    );
  }
}

export default SaveForm;
