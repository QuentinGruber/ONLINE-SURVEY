import React, { Component } from "react";
import Chart from "chart.js";

export default class BarChart extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");
    var randomHexColor = require("random-hex-color");
    let color_array = [];
    this.props.data.forEach((element) => {
      color_array.push(randomHexColor());
    });

    new Chart(myChartRef, {
      type: "bar",
      data: {
        //Bring in data
        labels: ["testastos"],
        datasets: [
          {
            label: "testastostestastos",
            data: this.props.data,
            backgroundColor: color_array,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
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
