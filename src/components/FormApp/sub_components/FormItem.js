import React from "react";
import { Button, Input } from "reactstrap";

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
                    value="exemple de réponse"
                    disabled
                  ></input>
                );
              case "radio":
                return <input type="radio" disabled></input>;
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
            onChange={(e) =>
              this.props.HandleQuestionTypeChange(
                this.props.index,
                e.target.value
              )
            }
          >
            <option value="nothing">--Please choose a question type--</option>
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
