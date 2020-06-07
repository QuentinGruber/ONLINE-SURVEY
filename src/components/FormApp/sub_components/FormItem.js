import React from "react";
import Select from "react-select";
import { Input } from "reactstrap";
import CheckboxAnswerList from "./answer_components/CheckboxAnswerList";
import RadioAnswerList from "./answer_components/RadioAnswerList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

library.add(faTrashAlt);

const questionTypes = [
  { value: "radio", label: "Choix unique" },
  { value: "checkbox", label: "Choix multiples" },
  { value: "text", label: "Texte" },
  { value: "number", label: "Chiffres" },
];

class FormItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClickDelete = this.onClickDelete.bind(this);
  }

  onClickDelete() {
    var index = parseInt(this.props.index); // get item index
    this.props.removeItem(index, parseInt(this.props.item.id)); // remove it
  }

  state = {
    selectedOption:
      questionTypes[
        questionTypes.findIndex((x) => x.value === this.props.item.type)
      ].label,
  };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  };

  render() {
    return (
      <>
        <li className="list-group-item card-question">
          <Input
            autoFocus
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

          <Select
            placeholder={this.state.selectedOption}
            options={questionTypes}
            name="QuestionType"
            className="type-select"
            id="sel1"
            value={this.state.selectedOption}
            onChange={(e) => {
              this.handleChange();
              this.props.item.p_answer = ""; // reset premade answer
              this.props.HandleQuestionTypeChange(this.props.index, e.value);
            }}
          />

          {(() => {
            switch (this.props.item.type) {
              case "text":
                return (
                  <input
                    readOnly="readonly"
                    type="text"
                    className="form-control text-answer-input"
                    placeholder="Réponse libre"
                  ></input>
                );
              case "number":
                return (
                  <input
                    readOnly="readonly"
                    type="text"
                    className="form-control text-answer-input"
                    placeholder="Réponse libre contenant uniquement un nombre"
                  ></input>
                );
              case "radio":
                return (
                  <RadioAnswerList
                    key={this.props.index}
                    removeOption={this.props.removeOption}
                    HandlePremadeAnswerChange={
                      this.props.HandlePremadeAnswerChange
                    }
                    index={this.props.index}
                    answers={this.props.item.p_answer}
                  />
                );
              case "checkbox":
                return (
                  <CheckboxAnswerList
                    key={this.props.index}
                    removeOption={this.props.removeOption}
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
              <span className="text-muted text-required">Obligatoire</span>
              <label htmlFor={"Require_" + this.props.index}>
                <span className="custom-toggle">
                  {this.props.item.required === 1 ? (
                    <input
                      type="checkbox"
                      id={"Require_" + this.props.index}
                      onChange={() => {
                        this.props.ToogleRequireStateChange(this.props.index);
                      }}
                      defaultChecked
                    />
                  ) : (
                    <input
                      type="checkbox"
                      id={"Require_" + this.props.index}
                      onChange={() => {
                        this.props.ToogleRequireStateChange(this.props.index);
                      }}
                    />
                  )}

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
