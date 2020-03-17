import React from 'react';
import Welcome from './component/sub_component/Welcome'
import Login from './component/Login';
import Register from './component/Register'
import Disconnect from './component/Disconnect'
import FormApp from './component/FormApp'


function App() {
  var formItems = []
  return (
    <div className="App">
      <Welcome />
      <Login />
      <Register />
      <FormApp initItems={formItems} />
      <Disconnect />
    </div>
  );
}

export default App;
