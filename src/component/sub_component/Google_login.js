import React from 'react';
import { Button } from "reactstrap";

import GoogleLogin from 'react-google-login';


class Google_Login extends React.Component {

    render() {
        const responseGoogle = (response) => {
            Google_Login(response)
        }

        const PUB_key = "maxon"; // TODO: need to read PUB_key from json

        function Google_Login(user_info) {
            var data = {
                "username": user_info.profileObj.name,
                "email": user_info.profileObj.email,
                "lname": user_info.profileObj.familyName,
                "fname": user_info.profileObj.givenName
            }

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () { // handle request response
                if (this.readyState === 4 && this.status === 200) {
                    if (this.responseText !== "false") {

                        if (Object.values(this.response[Object.values(this.response).length - 3])[0] === "0") {
                            // next step check if provided email isn't already in our database
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
                            var jwt_token = jwt.sign({ username: data.username, lname: data.lname, fname: data.fname, email: data.email, registration_type: "1" }, PUB_key);
                            xhttp.open("POST", process.env.REACT_APP_API_URL + "/sign_up?jwt_token=" + jwt_token + "", true);
                            xhttp.send();
                        }
                        else {
                            alert("Login succesfull!");
                        }

                    }
                    else {
                        alert("Wrong username/password !");
                    }
                }
            };
            // Send a post request
            var jwt = require('jsonwebtoken');
            var jwt_token = jwt.sign({ email: data.email }, PUB_key);
            xhttp.open("POST", process.env.REACT_APP_API_URL + "/Check_Email?jwt_token=" + jwt_token + "", true);
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