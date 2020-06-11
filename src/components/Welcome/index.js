import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

class Welcome extends React.Component {
  render() {
    return (
      <>
        <div>
          <Link to="/auth/login">
            <Button>Connexion</Button>
          </Link>
          <Link to="/auth/register">
            <Button>Inscription</Button>
          </Link>

          <Button>fleche bas</Button>
        </div>
        {/* la div de la page du blabla*/}
        <div>
          <Link to="/auth/login">
            <Button>Connexion</Button>
          </Link>
          <Link to="/auth/register">
            <Button>Inscription</Button>
          </Link>
          <h2>Your forms, made simple</h2>
          <p>
            On sait, on sait : recevoir du feedback, c’est une des choses les
            plus importantes pour votre entreprise. Formulaires de satisfaction
            client, sondages auprès de vos collaborateurs, questionnaires
            d’évaluations, fiches de renseignements… On pourrait étendre cette
            liste à l’infini. Le temps passé à construire ces formulaires, en
            extraire les données, les compiler sous formes de graphiques ou de
            statistiques pourrait bien constituer la majeure partie de votre
            emploi du temps. Et c’est là qu’on a quelque chose à vous proposer :
            Online Survey, c’est tout d’abord une solution conçue pour vous
            faire gagner du temps. Toutes les étapes pour recevoir du Feedback
            en une seule application Web d’une simplicité déconcertante.
            Connectez-vous, créez votre formulaire, recevez vos réponses,
            visualisez vos résultats. Nous pensons que cela ne devrait pas être
            plus compliqué que ça. Et avec Online Survey, ça ne l’est pas.
          </p>
        </div>
        {/* footer*/}
        <div></div>
      </>
    );
  }
}
export default Welcome;
