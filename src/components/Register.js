import React from 'react';
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
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";
import GoogleLogin from './sub_components/Google_login'
import FacebookLogin from './sub_components/Facebook_login'
import LinkedInLogin from './sub_components/linkedin_login'

class Register extends React.Component {
  render() {
    var jwt = require('jsonwebtoken');
    const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;


    function validatePassword() {
      //check if passwords are the same
      var password = document.getElementById("Register_pass")
      var confirm_password = document.getElementById("Register_confirm_pass");
      if(password.value !== confirm_password.value) {
        confirm_password.setCustomValidity("Les mots de passe ne correspondent pas");
        return false
      } else {
        confirm_password.setCustomValidity('');
        return true
      }
    }

    function Verify_register_info() {
      // Display an error if an required input is not good filled
      var form = document.getElementById("registerBox")
      form.reportValidity()

      var isValidUsername = document.getElementById("Register_name").checkValidity();
      var isValidEmail = document.getElementById("Register_email").checkValidity();
      var isValidPassword = document.getElementById("Register_pass").checkValidity();
      var isValidCheckbox = document.getElementById("check_register").checkValidity();
      var passwordsMatch = validatePassword()
      // If all required input are correctly filled we check if
      // username is already in our DB or not
      if (isValidUsername && isValidEmail && isValidPassword && isValidCheckbox && passwordsMatch) {
        Check_Username()
      }
    }

    function Check_Username() {
      // Check if Username is not already taken
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () { // handle request response
        if (this.readyState === 4 && this.status === 200) {
          // response format is a rowdatapacket so it was needed to do like that.
          if (Object.values(this.response[Object.values(this.response).length - 3])[0] === "0")
            // next step check if provided email isn't already in our database
            Check_Email();
          else
            alert("Username already taken !");
        }
      };
      // Send a post request
      var jwt_token = jwt.sign({ username: document.getElementById("Register_name").value }, SECRET_KEY);
      xhttp.open("POST", process.env.REACT_APP_API_URL + "/Check_Username?jwt_token=" + jwt_token + "", true);
      xhttp.withCredentials = true;
      xhttp.send();
    }

    function Check_Email() {
      // Check if provided email is not already in our database
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () { // handle request response
        if (this.readyState === 4 && this.status === 200) {
          // response format is a rowdatapacket so it was needed to do like that.
          if (Object.values(this.response[Object.values(this.response).length - 3])[0] === "0") {
            // information has been checked now we can register the user
            Register();
          }
          else
            alert("An account already use this email address ! ");
        }
      };
      // Send a post request
      var jwt_token = jwt.sign({ email: document.getElementById("Register_email").value }, SECRET_KEY);
      xhttp.open("POST", process.env.REACT_APP_API_URL + "/Check_Email?jwt_token=" + jwt_token + "", true);
      xhttp.withCredentials = true;
      xhttp.send();
    }

    function Register() {
      // get our input values
      var username = document.getElementById("Register_name").value;
      var password = document.getElementById("Register_pass").value;
      var email = document.getElementById("Register_email").value;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () { // handle request response
        if (this.readyState === 4 && this.status === 200) {
          if (this.responseText === "true") {
            alert("Registered succesfully!")
            window.location.reload();
          }
          else {
            alert("Fail to register...sorry")
          }
        }
      };
      // Send a post request
      var jwt_token = jwt.sign({ username: username, password: password, email: email, registration_type: "0" }, SECRET_KEY);
      xhttp.open("POST", process.env.REACT_APP_API_URL + "/sign_up?jwt_token=" + jwt_token + "", true);
      xhttp.withCredentials = true;
      xhttp.send();
    }

    return (
      <>
        <Card className="fullCard bg-secondary w-33 shadow border-0">
          <CardHeader className="bg-transparent ">
            <div className="text-muted text-center">
              <small>S'inscrire avec</small>
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
            <Form role="form" id="registerBox">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input id="Register_name" name="username" placeholder="Nom d'utilisateur" type="text" pattern='.{3,16}' required />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="text" id="Register_email" name="email" placeholder="Email" pattern='^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$' title="Doit respecter le format d'un email" required />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="password" id="Register_pass" name="password" placeholder="Mot de passe" onChange={validatePassword} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Doit contenir au moins un chiffre, une minuscule, une majuscule, et 8 caractères" autoComplete="new-password" required />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="password" id="Register_confirm_pass" name="confirm_password" onKeyUp={validatePassword} placeholder="Confirmer mot de passe" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Doit contenir au moins un chiffre, une minuscule, une majuscule, et 8 caractères" autoComplete="new-password" required />
                </InputGroup>
              </FormGroup>
              <Row className="my-2">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="check_register"
                      type="checkbox"
                      name="checkbox inscription"
                      required
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="check_register">

                        <span className="text-muted">
                          J'accepte les {" "}
                          <a href="/legal" >
                            conditions d'utilisation&nbsp;
                          </a>
                          de Online Survey
                        </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                  <Button onClick={Verify_register_info} className="btn-submit p-3 my-1 btn-icon" color="default" type="button" value="SUBMIT">
                    Inscription
                  </Button>
                </div>
                </Form>
                <Row>
                  <Col className="text-right">
                    <NavLink
                      to="/auth/login"
                      tag={Link}
                    >
                      <small className="text-light">Se connecter à un compte existant</small>
                    </NavLink>
                  </Col>
                </Row>
          </CardBody>
        </Card>
      </>

    )
  }
}
export default Register;