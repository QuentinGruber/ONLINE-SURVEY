import React from "react";
import { Input } from "reactstrap";
import RadioAnswerList from "./answer_components/RadioAnswerList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

library.add(faTrashAlt);

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
        <li className="list-group-item card-question">
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

          <select
            name="QuestionType"
            className="type-select selectpicker form-control"
            id="sel1"
            value={this.props.item.type}
            onChange={(e) => {
              this.props.item.p_answer = ""; // reset premade answer
              this.props.HandleQuestionTypeChange(
                this.props.index,
                e.target.value
              );
            }}
          >
            <option value="radio">Choix unique</option>
            <option value="radio">Choix multiples / A FAIRE</option>
            <option value="text">Texte</option>
            <option value="text">Chiffres / A FAIRE</option>
          </select>
          {/* type de reponse */}

          {(() => {
            switch (this.props.item.type) {
              case "text":
                return (
                  <input
                    readonly="readonly"
                    type="text"
                    class="form-control text-answer-input"
                    value={this.props.item.p_answer}
                    placeholder="Réponse libre"
                  ></input>
                );
              case "radio":
                return (
                  <RadioAnswerList
                    key={this.props.index}
                    HandlePremadeAnswerChange={
                      this.props.HandlePremadeAnswerChange
                    }
                    index={this.props.index}
                    answers={this.props.item.p_answer}
                  />
                );
              default:
                console.error(
                  this.props.item.type + " is not an handled question type"
                );
                break;
            }
          })()}

          <div className="question-footer">
            <div className="box-delete-question">
              <button
                type="button"
                className="close delete-question"
                aria-label="Close"
                onClick={this.onClickDelete}
              >
                <FontAwesomeIcon icon="trash-alt" className="fa-xs" />
              </button>
            </div>

            <div className="box-required">
              <span className="text-muted text-required">obligatoire</span>
              <label htmlFor={"Require_" + this.props.index}>
                <span className="custom-toggle">
                  <input
                    type="checkbox"
                    id={"Require_" + this.props.index}
                    onChange={() => {
                      this.props.ToogleRequireStateChange(this.props.index);
                    }}
                  />
                  <span className="custom-toggle-slider rounded-circle" />
                </span>
              </label>
            </div>
          </div>
        </li>
      </>
    );
  }
}

export default FormItem;
