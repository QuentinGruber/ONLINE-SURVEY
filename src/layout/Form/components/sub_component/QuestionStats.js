import React from "react";
import Select from "react-select";
import PieChart from "../../../../components/ChartComponents/PieChart";
import Polar from "../../../../components/ChartComponents/Polar";
import Doughnut from "../../../../components/ChartComponents/Doughnut";
import BarChart from "../../../../components/ChartComponents/BarChart";
import List from "../../../../components/ChartComponents/List";
import LineChart from "../../../../components/ChartComponents/LineChart";

class QuestionStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedOption: this.props.questionTypes[0].value };
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  };

  render() {
    return (
      <>
        <h2>{this.props.name}</h2>
        {this.props.questionTypes.length > 1 ? (
          <Select
            placeholder={this.state.selectedOption}
            options={this.props.questionTypes}
            name="QuestionType"
            className="type-select"
            id="sel1"
            value={this.state.selectedOption}
            onChange={(e) => {
              this.handleChange(e.value);
            }}
          />
        ) : null}

        {(() => {
          if (this.props.questionTypes.length > 1) {
            switch (this.state.selectedOption) {
              case "Polar":
                return <Polar data={this.props.data} />;
              case "PieChart":
                return <PieChart data={this.props.data} />;
              case "Doughnut":
                return <Doughnut data={this.props.data} />;
              case "BarChart":
                return <BarChart data={this.props.data} />;
              case "List":
                return <List data={this.props.data} />;
              case "LineChart":
                return <LineChart data={this.props.data} />;
              default:
                console.error("unknown  : " + this.state.selectedOption);
                break;
            }
          } else {
            return <List data={this.props.data} />;
          }
        })()}
      </>
    );
  }
}
export default QuestionStats;
