import React from "react";
import { Card } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

library.add(faShareAlt);
library.add(faTrashAlt);

class FormTitle extends React.Component {
  render() {
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

        <div
          className="div-share-form"
          onClick={() =>
            console.log(`Partager le formulaire "${this.props.data.name}"`)
          }
        >
          Partager
          <FontAwesomeIcon icon="share-alt" className="fa-s share-icon" />
        </div>

        <div
          className="div-edit-form"
          onClick={() =>
            console.log(`Éditer le formulaire "${this.props.data.name}"`)
          }
        >
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
        </div>
      </Card>
    );
  }
}

export default FormTitle;
