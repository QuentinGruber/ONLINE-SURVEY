import React from 'react';
import { LinkedIn } from 'react-linkedin-login-oauth2';



class LinkedInLogin extends React.Component {
    handleSuccess = (data) => {
        this.setState({
          code: data.code,
          errorMessage: '',
        });
        console.log(data)
      }
    
      handleFailure = (error) => {
        this.setState({
          code: '',
          errorMessage: error.errorMessage,
        });
      }
    render() {
        return (
            <LinkedIn
                clientId="78s03bsfw6m7c3"
                onFailure={this.handleFailure}
                onSuccess={this.handleSuccess}
                redirectUri="/"
                renderElement={({ onClick, disabled }) => (
                    <button onClick={onClick} disabled={disabled}>Custom linkedin element</button>
                )}
            />
        )
    }
}

export default LinkedInLogin;