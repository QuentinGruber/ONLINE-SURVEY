import React from "react";
import { Button } from "reactstrap";
import FacebookLoginAPI from "react-facebook-login/dist/facebook-login-render-props";
import Api_Utils from "./api_utils";

class FacebookLogin extends React.Component {
  render() {
    const responseFacebook = (response) => {
      var user_data = {
        username: response.name,
        email: response.email,
      };
      Api_Utils.Login(user_data, "3", "Facebook");
    };
    return (
      <FacebookLoginAPI
        appId="645670846005275"
        fields="name,email"
        callback={responseFacebook}
        render={(renderProps) => (
          <Button
            className="btn-icon apiButton"
            color="default"
            onClick={renderProps.onClick}
          >
            <span>Facebook</span>
          </Button>
        )}
      />
    );
  }
}

export default FacebookLogin;
