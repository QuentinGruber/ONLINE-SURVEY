import React from "react";
import { Card } from "reactstrap";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import ClipboardJS from "clipboard";
import Axios from "axios";

library.add(faShareAlt, faEdit, faChevronRight);

class FormTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nb_answer: 0 };
  }

  async componentDidMount() {
    let nb_answer_promise = await Axios({
      method: "get",
      url:
        process.env.REACT_APP_API_URL + "/numberofanswer/" + this.props.data.id,
      withCredentials: true,
      data: { FormID: this.props.data.id },
    });
    this.setState({
      nb_answer: nb_answer_promise.data,
    });
  }

  async send_stats() {
    let question_list_promise = await Axios({
      method: "get",
      url: process.env.REACT_APP_API_URL + "/question_list/",
      withCredentials: true,
    });
    let stats = [];
    question_list_promise.forEach((question) => {
      let question_info_promise = await Axios({
        method: "get",
        url: process.env.REACT_APP_API_URL + "/question_info/" + question.id,
        withCredentials: true,
      });
  
      let answers_promise = await Axios({
        method: "get",
        url: process.env.REACT_APP_API_URL + "/question_answers/" + question.id,
        withCredentials: true,
      });


      stats.push({
        type: question_info_promise.data.type,
        name: question_info_promise.data.name,
        answers: answers_promise.data,
      });
    });

    this.props.updt_selected_form_card([
      { type: "numbers", name: "pipi", answers: ["1", "4", "1"] },
      { type: "text", name: "caca", answers: ["1", "4", "1"] },
    ]);
  }

  render() {
    new ClipboardJS(".div-share-form");
    return (
      <Card className="form-list-card-form">
        <div className="div-title-form">{this.props.data.name}</div>
        <div className="div-trash-icon">
          <button
            type="button"
            className="close button-delete-form"
            aria-label="Close"
            onClick={async () => {
              await Axios({
                method: "delete",
                url: process.env.REACT_APP_API_URL + "/form/",
                withCredentials: true,
                data: { FormID: this.props.data.id },
              });
              this.props.remove_form(this.props.idx);
            }}
          >
            <FontAwesomeIcon icon="trash-alt" className="fa-s trash-icon" />
          </button>
        </div>
        <div className="div-answers-form">
          {this.state.nb_answer} Réponses -{" "}
        </div>
        <div
          className="div-share-form"
          data-clipboard-text={this.props.FormLink}
        >
          Partager
          <FontAwesomeIcon icon="share-alt" className="fa-s share-icon" />
        </div>
        <Link
          to={"form/" + this.props.data.id + "/edit"}
          className="div-edit-form"
        >
          <FontAwesomeIcon icon="edit" className="fa-s edit-icon" />
          Éditer le formulaire
        </Link>
        <div
          className="div-stats-form"
          onClick={() => {
            this.send_stats();
          }}
        >
          Résultats et statistiques
          <FontAwesomeIcon icon="chevron-right" className="fa-xl stats-icon" />
        </div>
      </Card>
    );
  }
}

export default FormTitle;
