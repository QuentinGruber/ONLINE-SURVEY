import React, { Component } from "react";
import Chart from "chart.js";

export default class LineChart extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: "line",
      data: {
        //Bring in data
        labels: this.props.data_date,
        datasets: [
          {
            label: this.props.datalabel,
            data: this.props.data,
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
