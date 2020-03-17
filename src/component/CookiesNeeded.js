import React from 'react';
import { Button } from "reactstrap";
class CookiesNeeded extends React.Component {
  
   AcceptCookies = () => {
    localStorage.AcceptCookies = "true"
    window.location.reload()
  }

  render() {
    return (
        <div>
        <h1>Ce site web à besoin des cookies pour fonctionner ! </h1>
        <Button onClick={this.AcceptCookies}> Accepter les cookies </Button>
        </div>
    )
  }
}

export default CookiesNeeded;