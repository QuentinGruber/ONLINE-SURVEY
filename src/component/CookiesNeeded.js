import React from 'react';
import { Button } from "reactstrap";
class CookiesNeeded extends React.Component {
  
   AcceptCookies = () => {
    localStorage.AcceptCookies = "true"
    window.location.reload()
  }

  render() {
    return (
        <div style={{textAlign: "center"}}>
        <h1>Ce site web à besoin des cookies pour fonctionner ! </h1>
        <p style={{width: "50%",margin: "auto"}}>En poursuivant votre navigation, vous acceptez l’utilisation de cookies pour améliorer votre expérience sur notre site et/ou la fourniture des services proposés par Online Survey.
         Ces types de cookies ne sont déposés sur vos terminaux qu’à condition que vous y consentiez,sur le site Internet ou l’application mobile de Online Survey. 
          Consultez les <a href="https://online-survey.com/legal">Mentions Légales relatives à la RGPD</a> pour en savoir plus</p>
        <Button onClick={this.AcceptCookies}> Accepter les cookies </Button>
        </div>
    )
  }
}

export default CookiesNeeded;