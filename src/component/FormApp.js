import React, { Component } from "react";
import { Button, Dropdown, Input } from "reactstrap";
import ReactDOM from "react-dom";

class SocialMedia extends Component {
  constructor(props) {
    super(props);
    this.questionTypeList = [
      {
        id: 1,
        name: "Open"
      },
      {
        id: 2,
        name: "QCM"
      }
    ]
    this.state = {
      FormData: []
    };
    this.handleAddQuestion = this.handleAddQuestion.bind(this);
    this.handleQuestionNameChange = this.handleQuestionNameChange.bind(this);
    this.handleQuestion = this.handleQuestion.bind(this);
    this.handleQuestionTypeChange = this.handleQuestionTypeChange.bind(this);
    this.handleQuestionValueChange = this.handleQuestionValueChange.bind(this);
    this.addExistingData = this.addExistingData.bind(this);
  }

  handleAddQuestion() {
    let array = this.state.FormData;
    array.push({ id: array.length + 1, questionType: "" });
    console.log(this.state.FormData)
    this.setState({ FormData: array });
  }

  handleQuestionNameChange(e, idx) {
    let array = this.state.FormData.slice();
    array[idx].name = e.target.value;
    console.log(array[idx]);
    this.setState({ FormData: array });
  }

  handleQuestionValueChange(e, idx) {
    let array = this.state.FormData.slice();
    array[idx].value = e.target.value;
    console.log(array[idx]);
    this.setState({ FormData: array });
  }

  handleQuestionTypeChange(socialName, idx) {
    let array = this.state.FormData.slice();
    array[idx].questionType = socialName;
    this.setState({ FormData: array });
  }

  handleQuestion(idx) {
    let array = this.state.FormData;
    array.splice(idx, 1);
    this.setState({ FormData: array });
  }

  addExistingData(data) {
    let array = this.state.FormData;
    console.log(data)
    for (var i = 0; i < Object.keys(data).length; i++) {
      console.log("for " + i + "times data length : " + Object.keys(data).length)
      array.push(data[i]);
    }
    this.setState({ FormData: array });
  }
  componentDidMount() {
    if (this.props.data != []) {
      this.addExistingData(this.props.data)
    }
  }


  render() {
    return (
      <div>
        <Button
          type="button"
          onClick={this.handleAddQuestion}
        >
          <span>
            <span>ADD NEW QUESTION</span>
          </span>
        </Button>

        <table>
          <tbody>
            {this.state.FormData.map((Form, idx) => (
              <tr key={idx}>
                <td>
                  <Input
                    type="text"
                    placeholder={`Question #${idx + 1}`}
                    value={Form.name}
                    onChange={e => this.handleQuestionNameChange(e, idx)}
                  />
                </td>
                <td>
                  {(() => {
                    switch (Form.questionType) {
                      case "Open": return (<Input
                        type="text"
                        placeholder={`réponse?`}
                        value={Form.value}
                        onChange={e => this.handleQuestionValueChange(e, idx)}
                      />);
                      case "QCM": return (<Input
                        type="radio"
                        placeholder={`réponse?`}
                        value={Form.value}
                        onChange={e => this.handleQuestionValueChange(e, idx)}
                      />);
                      default: break;
                    }
                  })()}
                </td>
                <td>
                  <select
                    onChange={e => {
                      this.handleQuestionTypeChange(e.target.value, idx);
                    }}
                    value={Form.questionType || "SelectOption"}
                  >
                    <option value="SelectOption" disabled>
                      Select question type
                    </option>
                    {this.questionTypeList.map(typeData => (
                      <option
                        value={typeData.name}
                        data={typeData}
                        key={typeData.id}
                      >
                        {typeData.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <Button
                    onClick={() => this.handleQuestion(idx)}
                  >
                    remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
console.log(document.getElementById('merde').getAttribute('data'))
ReactDOM.render(<SocialMedia data={document.getElementById('merde').getAttribute('data')} />, document.getElementById('merde'));