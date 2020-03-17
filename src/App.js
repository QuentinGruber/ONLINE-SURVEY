import React from 'react';
import Welcome from './component/sub_component/Welcome'
import Login from './component/Login';
import Register from './component/Register'
import FormCreator from './component/FormCreator'
import Disconnect from './component/Disconnect'



function App() {
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
