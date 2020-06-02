import React from "react";
import Select from "react-select";
import { Input } from "reactstrap";
import RadioAnswerList from "./answer_components/RadioAnswerList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

library.add(faTrashAlt);

const questionTypes = [
  { value: "radio", label: "Choix unique" },
  { value: "checkbox", label: "Choix multiples // A FAIRE" },
  { value: "text", label: "Texte" },
  { value: "numbers", label: "Chiffres // A FAIRE" },
];

class FormItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClickDelete = this.onClickDelete.bind(this);
  }

  onClickDelete() {
    var index = parseInt(this.props.index); // get item index
    this.props.removeItem(index); // remove it
  }

  state = {
    selectedOption: "Choix unique",
  };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  };

  render() {
    const { selectedOption } = this.state;

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
            placeholder={"Choix unique"}
            options={questionTypes}
            name="QuestionType"
            className="type-select"
            id="sel1"
            value={selectedOption}
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
                    readonly="readonly"
                    type="text"
                    class="form-control text-answer-input"
                    value={"test"}
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
              <span className="text-muted text-required">Obligatoire</span>
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
