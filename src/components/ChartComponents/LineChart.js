import React, { Component } from "react";
import Chart from "chart.js";

export default class LineChart extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");
    var randomHexColor = require("random-hex-color");
    let color_array = [];
    let label_array = [];
    let data_array = [];
    var count = require("count-array-values");
    let data = count(this.props.data);
    data.sort((a, b) => {
      if (a.value < b.value) return -1;
      if (a.value > b.value) return 1;
      return 0;
    });
    data.forEach((element) => {
      color_array.push(randomHexColor());
      label_array.push(element.value);
      data_array.push(element.count);
    });

    new Chart(myChartRef, {
      type: "line",
      data: {
        //Bring in data
        labels: label_array,
        datasets: [
          {
            order: 1,
            fill: false,
            data: data_array,
            backgroundColor: color_array,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
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
