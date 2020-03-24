import React from 'react';
import Welcome from './components/sub_components/Welcome'
import Login from './components/Login';
import Register from './components/Register'
import Disconnect from './components/Disconnect'



function App() {
  return (
    <div className="App">
      <Welcome />
      <Login />
      <Register />
      <Disconnect />
    </div>
  );
}

export default App;
