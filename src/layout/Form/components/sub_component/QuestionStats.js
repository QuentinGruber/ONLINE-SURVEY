import React from "react";
import Select from "react-select";
import PieChart from "../../../../components/ChartComponents/PieChart";
import Polar from "../../../../components/ChartComponents/Polar";
import BarChart from "../../../../components/ChartComponents/BarChart";
import List from "../../../../components/ChartComponents/List";
import LineChart from "../../../../components/ChartComponents/LineChart";

class QuestionStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: {
        value: this.props.questionTypes[0].value,
        label: this.props.questionTypes[0].label,
      },
    };
  }

  handleChange = (selectedOption) => {
    let temp_selectedOption = this.state.selectedOption;
    temp_selectedOption.value = selectedOption;
    temp_selectedOption.label = this.props.questionTypes[
      this.props.questionTypes.findIndex((x) => x.value === selectedOption)
    ].label;
    this.setState({ selectedOption: temp_selectedOption });
  };

  render() {
    return (
      <>
        <div className="stats-question-title">{this.props.name}</div>
        {this.props.questionTypes.length > 1 ? (
          <Select
            placeholder={this.state.selectedOption.label}
            options={this.props.questionTypes}
            name="QuestionType"
            className="type-select"
            id="sel1"
            value={this.state.selectedOption.value}
            onChange={(e) => {
              this.handleChange(e.value);
            }}
          />
        ) : null}

        {(() => {
          if (this.props.questionTypes.length > 1) {
            switch (this.state.selectedOption.value) {
              case "Polar":
                return <Polar data={this.props.data} />;
              case "PieChart":
                return <PieChart data={this.props.data} />;
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
