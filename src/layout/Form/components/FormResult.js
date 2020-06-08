import React from "react";
import { Card } from "reactstrap";
class form_result extends React.Component {
  render() {
    if (this.props.form_data !== undefined) {
      return (
        <Card className="stats-card">
          <div className="placeholder-stats-div">{this.props.form_data}</div>
        </Card>
      ); // for graph & shit
    } else {
      return (
        <Card className="stats-card">
          <div className="placeholder-stats-div">
            Cliquez sur "Résultats et statistiques" pour consulter les
            statistiques du formulaire
          </div>
        </Card>
      );
    }
  }
}

export default form_result;
