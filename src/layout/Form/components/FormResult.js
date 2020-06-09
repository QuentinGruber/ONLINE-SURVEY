import React from "react";
import { Card } from "reactstrap";
import Piechart from "../../../components/ChartComponents/PieChart";
import Barchart from "../../../components/ChartComponents/BarChart";
import Doughnut from "../../../components/ChartComponents/Doughnut";
class form_result extends React.Component {
  render() {
    if (true) {
      // if (this.props.form_data !== undefined) {
      return (
        <Card className="stats-card">
          <div className="placeholder-stats-div">{this.props.form_data}</div>
          {/*<Piechart data={["1", "5", "3", "4", "6", "4", "5", "2"]*/} />
          {/*<Barchart data={["1", "5", "3", "4", "6", "4", "5", "2"]*/} />
          <Doughnut data={["1", "5", "3", "4", "6", "4", "5", "2"]} />
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
