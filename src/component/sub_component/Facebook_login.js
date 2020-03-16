import React from 'react';
import { Button } from "reactstrap";
import FacebookLoginAPI from 'react-facebook-login/dist/facebook-login-render-props'

class FacebookLogin extends React.Component {
    render() {
        const responseFacebook = (response) => {
            var user_data = {
                "username": response.name,
                "email": response.email
            }
            Facebook_Login(user_data)
        }
        var jwt = require('jsonwebtoken');

        const PUB_key = "maxon"; // TODO: need to read PUB_key from json

        function Check_Username(user_data) {
            // Check if Username is not already taken
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () { // handle request response
                if (this.readyState === 4 && this.status === 200) {
                    // response format is a rowdatapacket so it was needed to do like that.
                    if (Object.values(this.response[Object.values(this.response).length - 3])[0] === "0")
                        // next step check if provided username isn't already in our database
                        Register_facebook_user(user_data)

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

        function Register_facebook_user(user_data) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () { // handle request response
                if (this.readyState === 4 && this.status === 200) {
                    if (this.responseText === "true") {
                        alert("register via google succesfull!")
                        window.location.reload();
                    }
                    else {
                        alert("Fail to Login via google...sorry")
                    }
                }
            };
            // Send a post request

            var jwt_token = jwt.sign({ username: user_data.username, email: user_data.email, registration_type: "3"}, PUB_key);
            xhttp.open("POST", process.env.REACT_APP_API_URL + "/sign_up?jwt_token=" + jwt_token + "", true);
            xhttp.withCredentials = true;
            xhttp.send();
        }

        function Facebook_Login(user_data) {
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
                            alert("The email adress linked to this facebook account is already registered !");
                        }

                    }
                    else {
                        alert("Error while login with Facebook !");
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
            <FacebookLoginAPI
                appId="645670846005275"
                fields="name,email"
                callback={responseFacebook}
                render={renderProps => (
                    <Button onClick={renderProps.onClick}>
                        <span>Facebook</span>
                    </Button>
                )} />

        )
    }
}

export default FacebookLogin;