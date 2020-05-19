import React from "react";
import { Input } from "reactstrap";
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

          <button
            type="button"
            className="close delete-question"
            aria-label="Close"
            onClick={this.onClickDelete}
          >
            <span aria-hidden="true">&times;</span>
          </button>




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
            <option value="nothing">choisir type</option>
            <option value="text">Texte</option>
            <option value="radio">Choix unique</option>
            <option value="text">Choix multiples</option>
          </select>

          {/* type de reponse */}

          {(() => {
            switch (this.props.item.type) {
              case "text":
                return (
                  <input readonly="readonly" type="text" class="form-control text-answer-input" value={this.props.item.p_answer} placeholder="Réponse libre"></input>
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

          <div className="box-required">
            <span className="text-muted text-required">Required</span>
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
        </li>
      </>
    );
  }
}

export default FormItem;
