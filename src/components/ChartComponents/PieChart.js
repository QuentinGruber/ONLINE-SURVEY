import React, { Component } from "react";
import Chart from "chart.js";

export default class PieChart extends Component {
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
      label_array.push("entrée " + element.value);
      data_array.push(element.count);
    });
    new Chart(myChartRef, {
      type: "pie",
      data: {
        //Bring in data
        labels: label_array,
        datasets: [
          {
            label: label_array,
            data: data_array,
            backgroundColor: color_array,
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
