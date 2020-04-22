import React from "react";
import RadioAnswer from "./RadioAnswer";
class RadioAnswerList extends React.Component {
  constructor(props) {
    super(props);
    this.answers = null;
    this.AddRadioButton = this.AddRadioButton.bind(this);
    this.RemoveRadioButton = this.RemoveRadioButton.bind(this);
    this.HandleRadioTextChange = this.HandleRadioTextChange.bind(this);
  }

  HandleRadioTextChange(id, NewText) {
    let temp_answers = this.answers;
    temp_answers[id].text = NewText;
    this.props.HandlePremadeAnswerChange(
      this.props.index,
      "radio",
      temp_answers
    );
  }

  HandleRadioCheckChange(id, NewText) {}

  AddRadioButton() {
    let temp_answers = this.answers;
    temp_answers.push({ text: "new", checked: false });
    this.props.HandlePremadeAnswerChange(
      this.props.index,
      "radio",
      temp_answers
    );
  }

  RemoveRadioButton(id) {
    let temp_answers = this.state.answers;
    temp_answers.splice(id, 1);
    this.setState({ answers: temp_answers });
    this.props.HandlePremadeAnswerChange(
      this.props.index,
      "radio",
      this.state.answers
    );
  }

  componentDidUpdate() {
    console.log(
      "%c RadioAnswerListUpdated ! answer = " + this.answers,
      "color: blue"
    );
  }

  componentWillMount() {
    this.answers = this.props.GetAnswers(this.props.index);
    console.log(typeof this.answers);
    if (typeof this.answers == "string") {
      this.answers = [
        { text: "réponse1", checked: true },
        { text: "réponse2", checked: false },
      ];
    }
  }

  render() {
    var items = [];
    for (var i = 0; i < this.answers.length; i++) {
      items.push({
        id: i,
        value: this.answers[i].text,
        checked: this.answers[i].checked,
      });
    }
    return (
      <>
        {items.map((RadioAnswerItem) => (
          <RadioAnswer
            id={RadioAnswerItem.id}
            key={RadioAnswerItem.id}
            index={this.props.index}
            value={RadioAnswerItem.value}
            checked={RadioAnswerItem.checked}
            RemoveRadioButton={this.RemoveRadioButton}
            HandleRadioTextChange={this.HandleRadioTextChange}
          />
        ))}
        <button onClick={this.AddRadioButton}>+</button>
      </>
    );
  }
}

export default RadioAnswerList;
