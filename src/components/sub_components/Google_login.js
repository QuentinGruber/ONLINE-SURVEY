import React from 'react';
import { Button } from "reactstrap";

import GoogleLogin from 'react-google-login';


class Google_Login extends React.Component {


    render() {
        var jwt = require('jsonwebtoken');
        const responseGoogle = (response) => {
            var user_data = {
                "username": response.profileObj.givenName + "." + response.profileObj.familyName,
                "email": response.profileObj.email,
                "lname": response.profileObj.familyName,
                "fname": response.profileObj.givenName
            }
            Google_Login(user_data)
        }

        const SECRET_KEY = process.env.REACT_APP_SECRET_KEY; 

        function Check_Username(user_data) {
            // Check if Username is not already taken
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () { // handle request response
                if (this.readyState === 4 && this.status === 200) {
                    // response format is a rowdatapacket so it was needed to do like that.
                    if (Object.values(this.response[Object.values(this.response).length - 3])[0] === "0")
                        // next step check if provided username isn't already in our database
                        Register_google_user(user_data)

                    else { // if already exist 
                        user_data.username = user_data.username + "1"
                        Check_Username(user_data) // retry with the new username
                    }
                }
            };
            // Send a post request
            var jwt_token = jwt.sign({ username: user_data.username }, SECRET_KEY);
            xhttp.open("POST", process.env.REACT_APP_API_URL + "/Check_Username?jwt_token=" + jwt_token + "", true);
            xhttp.withCredentials = true;
            xhttp.send();
        }

        function Register_google_user(user_data) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () { // handle request response
                if (this.readyState === 4 && this.status === 200) {
                    if (this.responseText === "true") {
                        alert("register via google succesfull!")
                        window.location.reload();
                    }
                    else {
                        alert("Fail to register via google...sorry")
                    }
                }
            };
            // Send a post request

            var jwt_token = jwt.sign({ username: user_data.username, lname: user_data.lname, fname: user_data.fname, email: user_data.email, registration_type: "1" }, SECRET_KEY);
            xhttp.open("POST", process.env.REACT_APP_API_URL + "/sign_up?jwt_token=" + jwt_token + "", true);
            xhttp.withCredentials = true;
            xhttp.send();
        }

        function Google_Login(user_data) {
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
                                    if (Object.values(this.response[Object.values(this.response).length - 3])[0] === "1") {
                                        var xhttp = new XMLHttpRequest();
                                        xhttp.onreadystatechange = function () { // handle request response
                                            if (this.readyState === 4 && this.status === 200) {
                                                if (this.responseText !== "false") {
                                                    alert("Login with Google succeed !");
                                                }
                                                else {
                                                    alert("Error happend when trying to log in with Google!");
                                                }
                                            }
                                        };
                                        // Send a post request
                                        var jwt = require('jsonwebtoken');
                                        var jwt_token = jwt.sign({ username: user_data.username, password: user_data.password,registration_type: "1"}, SECRET_KEY);
                                        xhttp.open("POST", process.env.REACT_APP_API_URL + "/sign_in?jwt_token=" + jwt_token + "", true);
                                        xhttp.withCredentials = true;
                                        xhttp.send();

                                    }
                                    else {
                                        alert("The email adress linked to this Google account is already registered !");
                                    }
                                }
                            }
                            var jwt_token = jwt.sign({ email: user_data.email }, SECRET_KEY);
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

            var jwt_token = jwt.sign({ email: user_data.email }, SECRET_KEY);
            xhttp.open("POST", process.env.REACT_APP_API_URL + "/Check_Email?jwt_token=" + jwt_token + "", true);
            xhttp.withCredentials = true;
            xhttp.send();

        }

        return (
            <GoogleLogin
                clientId="367335034854-8kolqq461bk29p1fl7umg0n0m2c8tacc.apps.googleusercontent.com"
                render={renderProps => (
                    <Button className="btn-neutral btn-icon" color="default" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        <span className="btn-inner--text">Google</span>
                    </Button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        )
    }
}

export default Google_Login;