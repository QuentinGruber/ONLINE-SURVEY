import React from "react";
import { Button } from "reactstrap";

class SaveForm extends React.Component {
  render() {
    return (
      <Button
        className="btn-icon save-form-button"
        color="default"
        onClick={this.props.save}
      >
        Enregistrer
      </Button>
    );
  }
}

export default SaveForm;
