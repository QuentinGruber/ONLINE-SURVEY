import React from 'react';
import Welcome from './component/sub_component/Welcome'
import Login from './component/Login';
import Register from './component/Register'
import FormCreator from './component/FormCreator'
import Disconnect from './component/Disconnect'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import "./assets/css/argon-dashboard-react.css";
import "./assets/css/argon-dashboard-react.min.css";
import "./assets/css/argon-dashboard-react.css.map";


function App() {
  const responseFacebook = (response) => {
    console.log(response);
  }
  return (
    <div className="App">
      <Welcome />
      <Login />
      <Register />
      <FormCreator />
      <Disconnect />
    </div>
  );
}

export default App;
