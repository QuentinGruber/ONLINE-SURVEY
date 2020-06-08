import React from "react";
import { Card } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import ClipboardJS from "clipboard";

library.add(faShareAlt, faEdit, faChevronRight);

class FormTitle extends React.Component {
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
            onClick={() =>
              console.log(`Supprimer le formulaire "${this.props.data.name}"`)
            }
          >
            <FontAwesomeIcon icon="trash-alt" className="fa-s trash-icon" />
          </button>
        </div>
        <div className="div-answers-form">{0} Réponses - </div>

        <div className="div-share-form" data-clipboard-text="basic">
          Partager
          <FontAwesomeIcon icon="share-alt" className="fa-s share-icon" />
        </div>

        <div
          className="div-edit-form"
          onClick={() =>
            console.log(`Éditer le formulaire "${this.props.data.name}"`)
          }
        >
          <FontAwesomeIcon icon="edit" className="fa-s edit-icon" />
          Éditer le formulaire
        </div>

        <div
          className="div-stats-form"
          onClick={() =>
            console.log(
              `Consulter les statistiques du formulaire "${this.props.data.name}"`
            )
          }
        >
          Résultats et statistiques
          <FontAwesomeIcon icon="chevron-right" className="fa-xl stats-icon" />
        </div>
      </Card>
    );
  }
}

export default FormTitle;
