import React from 'react';
import Welcome from './component/sub_component/Welcome'
import Login from './component/Login';
import Register from './component/Register'
import Disconnect from './component/Disconnect'
import { render } from '@testing-library/react';


class App extends React.Component {

  componentDidMount(){
  require('./component/FormApp')
  }
  render(){
    var formItems = []
  return (
    <div className="App" id="merde">
    </div>
  );
  }
}

export default App;
