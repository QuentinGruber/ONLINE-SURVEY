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
import GoogleLogin from 'react-google-login';
  
class Login extends React.Component {
    
    render() {
      const responseGoogle = (response) => {
        console.log(response);
        Google_Login(response)
      }
      const PUB_key = "maxon"; // TODO: need to read PUB_key from json
        function Google_Login(user_info){
          var data = {
           "Username" : user_info.profileObj.name,
           "Email" : user_info.profileObj.email,
           "Lname" : user_info.profileObj.familyName,
           "Fname" : user_info.profileObj.givenName
          }

          console.log(data);
        }
        function Login(){
            // get our input values
            var username = document.getElementById("Login_name").value;
            var password = document.getElementById("Login_pass").value;
            var Keep_logged = document.getElementById("check_login").checked;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() { // handle request response
                if (this.readyState === 4 && this.status === 200) {
                    if(this.responseText !== "false"){
                        localStorage.clear()
                        sessionStorage.clear()
                        if(Keep_logged){
                            localStorage.setItem("Admin_token",this.responseText) // store user's Admin_token in his local storage 
                            alert("Logged in !");
                        }
                        else{
                            sessionStorage.setItem("Admin_token",this.responseText) // store user's Admin_token in his session storage 
                            alert("Logged in !");
                        }
                    }
                    else{
                        alert("Wrong username/password !");
                    }
               }
            };
            // Send a post request
            var jwt = require('jsonwebtoken');
            var jwt_token = jwt.sign({ username: username,password: password }, PUB_key);
            xhttp.open("POST", process.env.REACT_APP_API_URL + "/sign_in?jwt_token="+jwt_token+"", true);
            xhttp.send(); 
        
        }
      return(


<>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <small>Se connecter avec</small>
              </div>
              <div className="btn-wrapper text-center">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >

                  <span className="btn-inner--text">Github</span>
                </Button>
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
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Ou se connecter avec les identifiants</small>
              </div>
              <Form role="form" id="loginBox">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input id="Login_name" name="username" placeholder="Username"/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input id="Login_pass" name="password" placeholder="Password" type="password"/>
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id="check_login"
                    type="checkbox"
                    name="checkbox rester connecté"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="check_login"
                  >
                    <span className="text-muted">Rester connecté</span>
                  </label>
                </div>
                <div className="text-center">
                  <Button onClick = {Login} className="my-4" color="primary" type="button">
                    Sign in
                  </Button>
                </div>
              </Form>
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
                    to="/auth/register"
                    tag={Link}
                  >
                    <span className="text-light">Create new account</span>
                  </NavLink>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </>
      );
    }
  }
  export default Login;