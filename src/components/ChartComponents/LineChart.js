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
    data.forEach((element) => {
      color_array.push(randomHexColor());
      label_array.push("Nombre d'entrées " + element.value);
      data_array.push(element.count);
    });

    new Chart(myChartRef, {
      type: "line",
      data: {
        //Bring in data
        labels: label_array,
        datasets: [
          {
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
