import React from 'react';
import LinkedIn from "react-linkedin-login-oauth2";

const PUB_key = "maxon"

class LinkedInLogin extends React.Component {

  handleSuccess = (data) => {
    console.log(data)

    /// A METTRE DANS LE BACK /Linkedin 
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () { // handle request response
      if (this.readyState === 4 && this.status === 200) {
        console.log(this.responseText);
      }
    };
    var jwt = require('jsonwebtoken');
    var jwt_token = jwt.sign({ code: data.code}, PUB_key);
    xhttp.open("POST", process.env.REACT_APP_API_URL + "/linkedin?jwt_token=" + jwt_token + "", true);
    xhttp.send();

  }

  handleFailure = (error) => {
    console.log(error)
  }
  render() {
    return (
      <LinkedIn
        scope="r_liteprofile+r_emailaddress"
        clientId="78s03bsfw6m7c3"
        onFailure={this.handleFailure}
        onSuccess={this.handleSuccess}
        redirectUri="http://localhost:3000/linkedin"
        renderElement={({ onClick, disabled }) => (
          <button onClick={onClick} disabled={disabled}>linkedin</button>
        )}
      />
    )
  }
}

export default LinkedInLogin;