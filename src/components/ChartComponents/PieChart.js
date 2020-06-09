import React, { Component } from "react";
import Chart from "chart.js";

export default class PieChart extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: "pie",
      data: {
        //Bring in data
        labels: [
          "Asia",
          "Africa",
          "Europe",
          "South America",
          "North America",
          "Oceania",
        ],
        datasets: [
          {
            label: this.props.datalabel,
            data: [
              this.props.data.Asia,
              this.props.data.Africa,
              this.props.data.Europe,
              this.props.data.South_America,
              this.props.data.North_America,
              this.props.data.Oceania,
            ],
            backgroundColor: this.props.color,
          },
        ],
      },
      options: {
        //Customize chart options
      },
    });
  }
  render() {
    return (
      <div>
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}
