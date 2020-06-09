import React, { Component } from "react";

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = { list_item: undefined };
  }
  componentDidMount() {
    var randomHexColor = require("random-hex-color");
    let color_array = [];
    let label_array = [];
    let data_array = [];
    let list_item = [];
    var count = require("count-array-values");
    let data = count(this.props.data);

    data.forEach((element) => {
      color_array.push(randomHexColor());
      label_array.push("Nombre d'entrées " + element.value);
      data_array.push(element.count);

      list_item.push(
        <div key={Math.random(10000)}>
          <dt>{element.value} : </dt> <dd>{element.count} réponse(s).</dd>{" "}
          <br />
        </div>
      );
    });

    this.setState({ list_item: list_item });
  }
  render() {
    if (this.state.list_item !== undefined) {
      return <>{this.state.list_item}</>;
    } else {
      return null;
    }
  }
}
