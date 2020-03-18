import React, { Component } from "react";
import { Button, Dropdown, Input, Table } from "reactstrap";
import ReactDOM from "react-dom";
import "./FormApp.css"

class FormApp extends Component {
  constructor(props) {
    super(props);
    this.questionTypeList = [ // list of possible question type
      {
        id: 1,
        name: "Open"
      },
      {
        id: 2,
        name: "QCM"
      }
    ]
    // Form data is inside a state so it update the component each time we modify stuff in it
    this.state = {
      FormData: []
    };
    // bind func to this
    this.handleAddQuestion = this.handleAddQuestion.bind(this);
    this.handleQuestionNameChange = this.handleQuestionNameChange.bind(this);
    this.handleRemoveQuestion = this.handleRemoveQuestion.bind(this);
    this.handleQuestionTypeChange = this.handleQuestionTypeChange.bind(this);
    this.handleQuestionValueChange = this.handleQuestionValueChange.bind(this);
    this.addExistingData = this.addExistingData.bind(this);
  }

  // Add new question
  handleAddQuestion() {
    let array = this.state.FormData;
    array.push({ id: array.length + 1, questionType: "" }); // by default a question has an empty question type
    this.setState({ FormData: array });
  }

  // if a question name has been changed
  handleQuestionNameChange(e, idx) {
    let array = this.state.FormData.slice();
    array[idx].name = e.target.value;
    this.setState({ FormData: array });
  }

  // if a question value has been changed
  handleQuestionValueChange(e, idx) {
    let array = this.state.FormData.slice();
    array[idx].value = e.target.value;
    console.log(array[idx]);
    this.setState({ FormData: array });
  }

  // if the type of a question has been changed
  handleQuestionTypeChange(socialName, idx) {
    let array = this.state.FormData.slice();
    array[idx].questionType = socialName;
    this.setState({ FormData: array });
  }

  // remove question
  handleRemoveQuestion(idx) {
    let array = this.state.FormData;
    array.splice(idx, 1);
    this.setState({ FormData: array });
  }

  addExistingData(data) { // Currently not working , will allow to display a registred form
    let array = this.state.FormData;
    console.log(data)
    for (var i = 0; i < Object.keys(data).length; i++) {
      console.log("for " + i + "times data length : " + Object.keys(data).length)
      array.push(data[i]);
    }
    this.setState({ FormData: array });
  }

  componentDidMount() { // when component has init , check whether data have been provided
    if (this.props.data != []) {
      // if that the case , add data to our form
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

        <table style={{width:"60%", margin: "auto"}}>
          <tbody>
            {this.state.FormData.map((Form, idx) => (
              <tr key={idx}>

                <td id="boxQuestionNumber">
                #{idx + 1}
                </td>
                <td id="boxQuestionTitle">
                  <Input
                    type="text"
                    placeholder={`Titre de la question`}
                    value={Form.name}
                    onChange={e => this.handleQuestionNameChange(e, idx)}
                  />
                </td>
                <td id="boxAnswers">
                  {(() => {
                    switch (Form.questionType) {
                      // depending on the type of question, a different input is generated
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
                <td id="boxQuestionType">
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
                <td id="boxRemoveQuestion">
                  <Button
                    onClick={() => this.handleRemoveQuestion(idx)}
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
ReactDOM.render(<FormApp data={document.getElementById('form').getAttribute('data')} />, document.getElementById('form'));