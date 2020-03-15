import React from 'react';
import { Button } from "reactstrap";
import FacebookLoginAPI from 'react-facebook-login/dist/facebook-login-render-props'

class FacebookLogin extends React.Component {
    render() {
        const responseFacebook = (response) => {
            console.log(response);
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