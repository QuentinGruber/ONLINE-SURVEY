import React from "react";
import { Card } from "reactstrap";
import Polar from "../../../components/ChartComponents/Polar";
class form_result extends React.Component {
  render() {
    if (true) {
      // if (this.props.form_data !== undefined) {
      return (
        <Card className="stats-card">
          <div className="placeholder-stats-div">{this.props.form_data}</div>
          <Polar data={["1", "5", "5", "3", "4", "6", "4", "5", "2"]} />
        </Card>
      );
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
