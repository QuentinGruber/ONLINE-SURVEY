import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavLink,
  FormGroup,
  Form,
  Input,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import GoogleLogin from "./sub_components/Google_login";
import FacebookLogin from "./sub_components/Facebook_login";
import LinkedInLogin from "./sub_components/linkedin_login";
class Login extends React.Component {
  render() {
    function keyPressed() {
      let password = document.getElementById("Login_pass");
      let username = document.getElementById("Login_name");
      password.classList.toggle("red-border", false);
      username.classList.toggle("red-border", false);
    }

    const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
    function Login() {
      // get our input values
      var username = document.getElementById("Login_name").value;
      var password = document.getElementById("Login_pass").value;
      // var Keep_logged = document.getElementById("check_login").checked;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        // handle request response
        if (this.readyState === 4 && this.status === 200) {
          if (this.responseText !== "false") {
            document.location.href = "/form";
          } else {
            let password = document.getElementById("Login_pass");
            let username = document.getElementById("Login_name");
            password.value = "";
            password.classList.toggle("red-border", true);
            username.classList.toggle("red-border", true);
          }
        }
      };
      // Send a post request
      var jwt = require("jsonwebtoken");
      var jwt_token = jwt.sign(
        { username: username, password: password },
        SECRET_KEY
      );
      xhttp.open(
        "POST",
        process.env.REACT_APP_API_URL + "/sign_in?jwt_token=" + jwt_token + "",
        true
      );
      xhttp.withCredentials = true;
      xhttp.send();
    }
    return (
      <>
        <Card className="fullCard bg-secondary w-33 shadow border-0">
          <CardHeader className="bg-transparent">
            <div className="text-muted text-center">
              <small>Se connecter avec</small>
            </div>
            <div className="apiBox btn-wrapper mt-3">
              <FacebookLogin />
              <LinkedInLogin />
              <GoogleLogin />
            </div>
          </CardHeader>
          <CardBody className="px-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Ou avec vos identifiants</small>
            </div>
            <Form role="form" id="loginBox">
              <FormGroup className="mb-4">
                <InputGroup className="input-group-alternative">
                  <Input
                    id="Login_name"
                    name="username"
                    placeholder="Nom d'utilisateur"
                    onChange={keyPressed}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    id="Login_pass"
                    name="password"
                    placeholder="Mot de passe"
                    type="password"
                    onChange={keyPressed}
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox my-4">
                <input
                  className="custom-control-input"
                  id="check_login"
                  type="checkbox"
                  name="checkbox rester connecté"
                />
                <label className="custom-control-label" htmlFor="check_login">
                  <span className="text-muted">Rester connecté</span>
                </label>
              </div>
              <div className="text-center">
                <Button
                  onClick={Login}
                  className="btn-submit p-3 my-1 btn-icon"
                  color="default"
                  type="button"
                >
                  Connexion
                </Button>
              </div>
            </Form>
            <Row className="mt-3">
              <Col xs="6"></Col>
              <Col className="text-right" xs="6">
                <NavLink to="/auth/register" tag={Link}>
                  <small className="text-light">Créer un compte</small>
                </NavLink>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </>
    );
  }
}
export default Login;
