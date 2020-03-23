import React from 'react';
import LinkedIn from "react-linkedin-login-oauth2";
import styles from "./styles.css";



class LinkedInLogin extends React.Component {
  state = {
    code: '',
    errorMessage: '',
  };


  handleSuccess = (data) => {
    console.log(data)
    this.setState({
      code: data.code,
      errorMessage: '',
    });
  }

  handleFailure = (error) => {
    console.log(error)
    this.setState({
      code: '',
      errorMessage: error.errorMessage,
    });
  }
    render() {
      const { code, errorMessage } = this.state;

        return (
          <LinkedIn
          scope="r_liteprofile+r_emailaddress"
          clientId="78s03bsfw6m7c3"
          onFailure={this.handleFailure}
          onSuccess={this.handleSuccess}
          redirectUri="http://localhost:3000/linkedin"
          renderElement={({ onClick, disabled }) => (
            <button onClick={onClick} disabled={disabled}>linkedin</button>
          )}
        />
        )
    }
}

export default LinkedInLogin;