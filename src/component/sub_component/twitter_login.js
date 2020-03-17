import React from 'react'
import { Button } from "reactstrap";
import TwitterLoginButton from "react-twitter-auth"
class TwitterLogin extends React.Component {


onSuccess = (response) => {
  const token = response.headers.get('x-auth-token');
  response.json().then(user => {
    if (token) {
      this.setState({isAuthenticated: true, user: user, token: token});
    }
  });
};

onFailed = (error) => {
  alert(error);
};
  render() {
    const loginUrl = process.env.REACT_APP_API_URL+ "/twitter_auth"
    return (
      <TwitterLoginButton loginUrl={loginUrl}
        onFailure={this.onFailed} onSuccess={this.onSuccess}
        requestTokenUrl={loginUrl} />
    )
  }
}

export default TwitterLogin
