import React from 'react';
import LinkedIn from "linkedin-login-for-react";
import styles from "./styles.css";



class LinkedInLogin extends React.Component {
    static propTypes = {};
 
  /*
    ** @code = authorization code from linkedin api
    ** @redirectUri = redirect uri from linkedin api
    ** @error = error message sign in failed
    */
  callbackLinkedIn = (error, code="KBghXMRTiKoNycwP", redirectUri="https://www.online-survey.app/auth/linkedin") => {
    if (error) {
      // signin failed
    } else {
      // Obtain authorization token from linkedin api
      // see https://developer.linkedin.com/docs/oauth2 for more info
    }
  };
    render() {
        return (
            <LinkedIn
                clientId="78s03bsfw6m7c3"
                callback={this.callbackLinkedIn}
                className={styles.linkedin}
                text="Login With LinkedIn"
            />
        )
    }
}

export default LinkedInLogin;