import React from "react";
import RadioAnswer from "./RadioAnswer";
class RadioAnswerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nb_answer: this.props.nb_answer };
  }
  render() {
    var items = [];
    for (var i = 0; i < this.state.nb_answer; i++) {
      items.push({ id: i });
    }
    return (
      <>
        {items.map((RadioAnswerItem) => (
          <RadioAnswer
            id={RadioAnswerItem.id}
            key={RadioAnswerItem.id}
            index={this.props.index}
          />
        ))}
      </>
    );
  }
}

export default RadioAnswerList;
