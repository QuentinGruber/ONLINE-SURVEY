import React from 'react';
import Login from './component/Login';
import Register from './component/Register'
import FormCreator from './component/FormCreator'
import "./assets/css/argon-dashboard-react.css";
import "./assets/css/argon-dashboard-react.min.css";
import "./assets/css/argon-dashboard-react.css.map";


function App() {
  return (
    <div className="App">
      <Login />
      <Register />
    </div>
  );
}

export default App;
