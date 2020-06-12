import React from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

library.add(faSignOutAlt);
class Disconnect extends React.Component {
  render() {
    function Disconnect() {
      // not used right now
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        // handle request response
        if (this.readyState === 4 && this.status === 200) {
          if (this.responseText !== "false") {
            document.location.href = "/auth";
          } else {
            alert("Erreur lors de la déconnexion.");
          }
        }
      };
      // Send a post request
      xhttp.open("DELETE", process.env.REACT_APP_API_URL + "/Disconnect", true);
      xhttp.withCredentials = true;
      xhttp.send();
    }
    return (
      <>
        <Button
          onClick={Disconnect}
          className="btn btn-outline-default btn-disconnect"
        >
          Déconnexion
        </Button>
        <Button
          onClick={Disconnect}
          className="btn btn-outline-default btn-disconnect-mobile"
        >
          <FontAwesomeIcon icon="sign-out-alt" className="disconnect-icon" />
        </Button>
      </>
    );
  }
}
export default Disconnect;
