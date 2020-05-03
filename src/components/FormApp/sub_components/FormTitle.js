import React from "react";
import { Input } from "reactstrap";

class FormTitle extends React.Component {
  render() {
    return (
      <Input
        placeholder={"Titre du formulaire"}
        className="form-title"
        value={this.props.title}
        onChange={(e) => this.props.handleChangeTitle(e.target.value)}
      ></Input>
    );
  }
}

export default FormTitle;
