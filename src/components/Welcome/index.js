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
        </div>
        {/* footer*/}
        <div></div>
      </>
    );
  }
}
export default Welcome;
