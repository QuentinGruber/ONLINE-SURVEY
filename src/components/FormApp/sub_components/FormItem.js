import React from "react";
import { Button, Input } from "reactstrap";
import RadioAnswerList from "./answer_components/RadioAnswerList";

class FormItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClickDelete = this.onClickDelete.bind(this);
  }

  onClickDelete() {
    var index = parseInt(this.props.index); // get item index
    this.props.removeItem(index); // remove it
  }
  render() {
    return (
      <>
        <li className="list-group-item card">
          <Input
            className="question"
            type="text"
            placeholder="Titre de la question"
            value={this.props.item.title}
            onChange={(e) =>
              this.props.handleChangeQuestionTitle(
                e.target.value,
                this.props.index
              )
            }
          />
          {(() => {
            switch (this.props.item.type) {
              case "nothing":
                return null;
              case "text":
                return (
                  <input
                    type="text"
                    value={this.props.item.p_answer}
                    onChange={(e) =>
                      this.props.HandlePremadeAnswerChange(
                        this.props.index,
                        e.target.type,
                        e.target.value
                      )
                    }
                    placeholder="exemple de réponse"
                  ></input>
                );
              case "radio":
                return (
                  <RadioAnswerList index={this.props.index} nb_answer={3} />
                );
              default:
                console.error(
                  this.props.item.type + " is not an handled question type"
                );
                break;
            }
          })()}
          <select
            name="QuestionType"
            id="type-select"
            value={this.props.item.type}
            onChange={(e) => {
              this.props.item.p_answer = ""; // reset premade answer
              this.props.HandleQuestionTypeChange(
                this.props.index,
                e.target.value
              );
            }}
          >
            <option value="nothing" disabled>
              --Please choose a question type--
            </option>
            <option value="text">text</option>
            <option value="radio">radio</option>
          </select>
          {/* type de reponse */}
          <Button type="button" className="close" onClick={this.onClickDelete}>
            Delete Question
          </Button>
        </li>
      </>
    );
  }
}

export default FormItem;
