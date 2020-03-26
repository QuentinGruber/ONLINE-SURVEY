import React from 'react';
import LinkedIn from "react-linkedin-login-oauth2";
import { Button } from 'reactstrap'
import Axios from 'axios';
const PUB_key = "maxon"

class LinkedInLogin extends React.Component {

   handleSuccess = async (data) => {
    var jwt = require('jsonwebtoken');
    var jwt_token = jwt.sign({ code: data.code}, PUB_key);
    try {
      var linkedin_promise = await Axios({
          method: 'post',
          url: process.env.REACT_APP_API_URL + "/linkedin?jwt_token=" + jwt_token + ""
      })
  }
  catch (e) {
      console.log(e)
  }

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
          <Button className="btn-neutral btn-icon" color="default" onClick={onClick} disabled={disabled}>Linkedin</Button>
        )}
      />
    )
  }
}

export default LinkedInLogin;