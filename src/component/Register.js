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

class Register extends React.Component {
  render() {
    var jwt = require('jsonwebtoken');
    const PUB_key = "maxon"; // TODO: need to read PUB_key from json

    function Verify_register_info() {
      // Display an error if an required input is not good filled
      var form = document.getElementById("registerBox")
      form.reportValidity()

      var isValidUsername = document.getElementById("Register_name").checkValidity();
      var isValidEmail = document.getElementById("Register_email").checkValidity();
      var isValidPassword = document.getElementById("Register_pass").checkValidity();
      var isValidCheckbox = document.getElementById("check_register").checkValidity();
      // If all required input are correctly filled we check if
      // username is already in our DB or not
      if (isValidUsername && isValidEmail && isValidPassword && isValidCheckbox) {
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
      var jwt_token = jwt.sign({username: document.getElementById("Register_name").value }, PUB_key);
      xhttp.open("POST", process.env.REACT_APP_API_URL + "/Check_Username?jwt_token="+jwt_token+"", true);
      xhttp.send();
    }

    function Check_Email() {
      // Check if provided email is not already in our database
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () { // handle request response
        if (this.readyState === 4 && this.status === 200) {
          // response format is a rowdatapacket so it was needed to do like that.
          if (Object.values(this.response[Object.values(this.response).length - 3])[0] === "0"){
            // information has been checked now we can register the user
            Register();
          }
          else
            alert("An account already use this email address ! ");
        }
      };
      // Send a post request
      var jwt_token = jwt.sign({email: document.getElementById("Register_email").value}, PUB_key);
      xhttp.open("POST", process.env.REACT_APP_API_URL + "/Check_Email?jwt_token="+jwt_token+"", true);
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
      var jwt_token = jwt.sign({ username: username,password: password,email: email,registration_type: "0"}, PUB_key);
      xhttp.open("POST", process.env.REACT_APP_API_URL + "/sign_up?jwt_token="+jwt_token+"", true);
      xhttp.send();
    }

    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-4">
                <small>S'inscrire avec</small>
              </div>
              <div className="text-center">
                <Button
                  className="btn-neutral btn-icon mr-4"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <span className="btn-inner--text">Github</span>
                </Button>
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <span className="btn-inner--text">Google</span>
                </Button>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Ou s'inscrire avec les identifiants</small>
              </div>
              <Form role="form" id="registerBox">
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input id="Register_name" name="username" placeholder="Username" type="text" pattern='.{3,16}' required />
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
                    <Input type="password" id="Register_pass" name="password" placeholder="Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Doit contenir au moins un chiffre, une minuscule, une majuscule, et 8 caractères" autoComplete="new-password" required />
                  </InputGroup>
                </FormGroup>
                <Row className="my-4">
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
                          <a href="https://www.dofus.com/fr" >
                            conditions d'utilisation&nbsp;
                          </a>
                          de Online Survey
                        </span>
                      </label>
                    </div>
                  </Col>
                </Row>
                <div className="text-center">
                  <Button onClick={Verify_register_info} id="registerSubmitButton" className="mt-4" color="primary" type="button" value="SUBMIT">
                    S'inscrire
                  </Button>
                </div>

                <Row className="mt-3">
                <Col xs="6">
                  <a
                    className="text-light"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    <small>Forgot password?</small>
                  </a>
                </Col>
                <Col className="text-right" xs="6">
                <NavLink
                    to="/auth/login"
                    tag={Link}
                  >
                    <span className="text-light">Log in to an existing account</span>
                  </NavLink>
                </Col>
              </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>

    )
  }
}
export default Register;