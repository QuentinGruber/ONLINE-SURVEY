import React from 'react';
import LinkedIn from "react-linkedin-login-oauth2";
import { Button } from 'reactstrap'
import Axios from 'axios';
import Api_Utils from './api_utils';


class LinkedInLogin extends React.Component {

  render() {
    const handleSuccess = async (data) => {
      var jwt = require('jsonwebtoken');
      var jwt_token = jwt.sign({ code: data.code}, process.env.REACT_APP_SECRET_KEY);
      try {
        var linkedin_promise = await Axios({
            method: 'post',
            url: process.env.REACT_APP_API_URL + "/linkedin?jwt_token=" + jwt_token + ""
        })
        var user_data = {
          "username": linkedin_promise.data.givenName + "." + linkedin_promise.data.familyName,
          "email": linkedin_promise.data.email,
          "lname": linkedin_promise.data.familyName,
          "fname": linkedin_promise.data.givenName
      }
      Api_Utils.Login(user_data,"2","Linkedin")
    }
    catch (e) {
        console.log(e)
    }
    }
   const  handleFailure = (error) => {
      console.log(error)
    }

    return (
      <LinkedIn
        scope="r_liteprofile+r_emailaddress"
        clientId="78s03bsfw6m7c3"
        onFailure={handleFailure}
        onSuccess={handleSuccess}
        redirectUri={process.env.REACT_APP_URL}
        renderElement={({ onClick, disabled }) => (
          <Button className="btn-icon apiButton" color="default" onClick={onClick} disabled={disabled}>Linkedin</Button>
        )}
      />
    )
  }
}

export default LinkedInLogin;