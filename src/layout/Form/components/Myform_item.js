import React from "react";
import { Card, Button } from "reactstrap";

class FormTitle extends React.Component {
  render() {
    return (
      <Card className="form-list-card-form">
        <div className="form-list-title">{this.props.data.name}</div>

        <div
          className="div-edit-form"
          onClick={() =>
            console.log(`Éditer le formulaire "${this.props.data.name}"`)
          }
        >
          Éditer le formulaire
        </div>

        <div
          className="div-stats-form"
          onClick={() =>
            console.log(
              `Consulter les statistiques du formulaire "${this.props.data.name}"`
            )
          }
        >
          Résultats et statistiques
        </div>
      </Card>
    );
  }
}

export default FormTitle;
