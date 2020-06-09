import React, { Component } from "react";
import Chart from "chart.js";

export default class StackedBarchart extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: "bar",
      data: {
        //Bring in data
        labels: ["France", "Worldwide"],
        datasets: [
          {
            label: "Deaths",
            data: [
              this.props.data.TotalNbDeathFR,
              this.props.data.TotalNbDeathALL,
            ],
            backgroundColor: this.props.color_deaths,
          },
          {
            label: "Cases",
            data: [
              this.props.data.TotalNbCaseFR,
              this.props.data.TotalNbCaseALL,
            ],
            backgroundColor: this.props.color_cases,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [{ stacked: true }],
          yAxes: [{ stacked: true }],
        },
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
