import React from "react";
import { Card } from "reactstrap";
import QuestionStats from "./sub_component/QuestionStats";
class form_result extends React.Component {
  render() {
    if (this.props.form_data !== undefined) {
      var items = [];
      this.props.form_data.forEach((question) => {
        switch (question.type) {
          case "number":
            items.push(
              <QuestionStats
                key={Math.random() * 10000}
                questionTypes={[
                  { value: "Polar", label: "Polar Graph" },
                  { value: "LineChart", label: "LineChart" },
                  { value: "BarChart", label: "BarChart" },
                ]}
                data={question.answers}
                name={question.name}
              />
            );
            break;
          case "text":
            items.push(
              <QuestionStats
                key={Math.random() * 10000}
                questionTypes={[{ value: "List", label: "List" }]}
                data={question.answers}
                name={question.name}
              />
            );
            break;
          case "radio":
            items.push(
              <QuestionStats
                key={Math.random() * 10000}
                questionTypes={[
                  { value: "Polar", label: "Polar Graph" },
                  { value: "PieChart", label: "PieChart" },
                  { value: "BarChart", label: "BarChart" },
                  { value: "Doughnut", label: "Doughnut" },
                ]}
                data={question.answers}
                name={question.name}
              />
            );
            break;
          case "checkbox":
            items.push(
              <QuestionStats
                key={Math.random() * 10000}
                questionTypes={[
                  { value: "Polar", label: "Polar Graph" },
                  { value: "PieChart", label: "PieChart" },
                  { value: "BarChart", label: "BarChart" },
                  { value: "Doughnut", label: "Doughnut" },
                ]}
                data={question.answers}
                name={question.name}
              />
            );
            break;
          default:
            console.error("unknow question type : " + question.type);
            break;
        }
      });
      return (
        <Card className="stats-card">
          <div className="stats-div">{items}</div>
        </Card>
      );
    } else {
      return (
        <Card className="stats-card">
          <div className="placeholder-stats-div">
            Cliquez sur "Résultats et statistiques" pour consulter les
            statistiques du formulaire.
          </div>
        </Card>
      );
    }
  }
}
export default form_result;
