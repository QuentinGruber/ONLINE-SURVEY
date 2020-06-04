import React from "react";
import { Card, Button } from "reactstrap";

class FormTitle extends React.Component {
  render() {
    return (
      <Card className="form-list-card-form">
        <div className="form-list-title">{this.props.data.name}</div>
        <div className="div-edit-form">Éditer le formulaire</div>
        <div className="div-stats-form">Résultats et statistiques</div>
      </Card>
    );
  }
}

export default FormTitle;
