import React from 'react';
import Welcome from './component/sub_component/Welcome'
import Login from './component/Login';
import Register from './component/Register'
import Disconnect from './component/Disconnect'
import { render } from '@testing-library/react';


class App extends React.Component {

  componentDidMount(){
  require('./component/FormApp/FormApp')
  }
  render(){
    var formItems = []//[{id: 1, questionType: "", name: "sex"},{id: 2, questionType: "", name: "pd"}]
  return (
    <div className="App" id="form" data={formItems}>
    </div>
  );
  }
}

export default App;
