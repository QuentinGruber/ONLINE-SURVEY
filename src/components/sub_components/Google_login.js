import React from "react";
import { Button } from "reactstrap";
import GoogleLogin from "react-google-login";
import Api_Utils from "./api_utils";

class Google_Login extends React.Component {
  render() {
    const responseGoogle = (response) => {
      var user_data = {
        username:
          response.profileObj.givenName + "." + response.profileObj.familyName,
        email: response.profileObj.email,
        lname: response.profileObj.familyName,
        fname: response.profileObj.givenName,
      };
      Api_Utils.Login(user_data, "1", "Google");
    };
    return (
      <GoogleLogin
        clientId="367335034854-8kolqq461bk29p1fl7umg0n0m2c8tacc.apps.googleusercontent.com"
        render={(renderProps) => (
          <Button
            className="btn-icon apiButton"
            color="default"
            onClick={renderProps.onClick}
          >
            <span className="btn-inner--text">Google</span>
          </Button>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    );
  }
}

export default Google_Login;
