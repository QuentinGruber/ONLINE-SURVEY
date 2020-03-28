import React from 'react';
import LinkedIn from "react-linkedin-login-oauth2";
import { Button } from 'reactstrap'
import Axios from 'axios';

class LinkedInLogin extends React.Component {

  render() {
    var jwt = require('jsonwebtoken');
    const handleSuccess = async (data) => {
      var jwt = require('jsonwebtoken');
      var jwt_token = jwt.sign({ code: data.code}, PUB_key);
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
        Linkedin_Login(user_data)
    }
    catch (e) {
        console.log(e)
    }
    }
   const  handleFailure = (error) => {
      console.log(error)
    }
  
    
    const PUB_key = process.env.REACT_APP_PUB_KEY; 

    function Check_Username(user_data) {
        // Check if Username is not already taken
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () { // handle request response
            if (this.readyState === 4 && this.status === 200) {
                // response format is a rowdatapacket so it was needed to do like that.
                if (Object.values(this.response[Object.values(this.response).length - 3])[0] === "0")
                    // next step check if provided username isn't already in our database
                    Register_Linkedin_user(user_data)

                else { // if already exist 
                    user_data.username = user_data.username + "1"
                    Check_Username(user_data) // retry with the new username
                }
            }
        };
        // Send a post request
        var jwt_token = jwt.sign({ username: user_data.username }, PUB_key);
        xhttp.open("POST", process.env.REACT_APP_API_URL + "/Check_Username?jwt_token=" + jwt_token + "", true);
        xhttp.withCredentials = true;
        xhttp.send();
    }

    function Register_Linkedin_user(user_data) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () { // handle request response
            if (this.readyState === 4 && this.status === 200) {
                if (this.responseText === "true") {
                    alert("register via Linkedin succesfull!")
                    window.location.reload();
                }
                else {
                    alert("Fail to register via Linkedin...sorry")
                }
            }
        };
        // Send a post request

        var jwt_token = jwt.sign({ username: user_data.username, lname: user_data.lname, fname: user_data.fname, email: user_data.email, registration_type: "2" }, PUB_key);
        xhttp.open("POST", process.env.REACT_APP_API_URL + "/sign_up?jwt_token=" + jwt_token + "", true);
        xhttp.withCredentials = true;
        xhttp.send();
    }

    function Linkedin_Login(user_data) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () { // handle request response
            if (this.readyState === 4 && this.status === 200) {
                if (this.responseText !== "false") {
                    // next step check if provided email isn't already in our database
                    if (Object.values(this.response[Object.values(this.response).length - 3])[0] === "0") {
                        // if not check if the username we want to give isn't already taken
                        Check_Username(user_data)
                    }
                    else {
                        xhttp.onreadystatechange = function () { // handle request response
                            if (this.readyState === 4 && this.status === 200) {
                                if (Object.values(this.response[Object.values(this.response).length - 3])[0] === "2") { // check registration_type
                                    var xhttp = new XMLHttpRequest();
                                    xhttp.onreadystatechange = function () { // handle request response
                                        if (this.readyState === 4 && this.status === 200) {
                                            if (this.responseText !== "false") {
                                                alert("Login with Linkedin succeed !");
                                            }
                                            else {
                                                alert("Error happend when trying to log in with Linkedin!");
                                            }
                                        }
                                    };
                                    // Send a post request
                                    var jwt = require('jsonwebtoken');
                                    var jwt_token = jwt.sign({ username: user_data.username, password: user_data.password,registration_type: "2"}, PUB_key);
                                    xhttp.open("POST", process.env.REACT_APP_API_URL + "/sign_in?jwt_token=" + jwt_token + "", true);
                                    xhttp.withCredentials = true;
                                    xhttp.send();

                                }
                                else {
                                    alert("The email adress linked to this Linkedin account is already registered !");
                                }
                            }
                        }
                        var jwt_token = jwt.sign({ email: user_data.email }, PUB_key);
                        xhttp.open("POST", process.env.REACT_APP_API_URL + "/Check_RegistrationType?jwt_token=" + jwt_token + "", true);
                        xhttp.withCredentials = true;
                        xhttp.send();
                    }

                }
                else {
                    alert("Wrong username/password !");
                }
            }
        };
        // Send a post request

        var jwt_token = jwt.sign({ email: user_data.email }, PUB_key);
        xhttp.open("POST", process.env.REACT_APP_API_URL + "/Check_Email?jwt_token=" + jwt_token + "", true);
        xhttp.withCredentials = true;
        xhttp.send();

    }

    return (
      <LinkedIn
        scope="r_liteprofile+r_emailaddress"
        clientId="78s03bsfw6m7c3"
        onFailure={handleFailure}
        onSuccess={handleSuccess}
        redirectUri={process.env.REACT_APP_URL}
        renderElement={({ onClick, disabled }) => (
          <Button className="btn-neutral btn-icon" color="default" onClick={onClick} disabled={disabled}>Linkedin</Button>
        )}
      />
    )
  }
}

export default LinkedInLogin;