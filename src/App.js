import React from 'react';
import logo from './logo.svg';
import './App.css';


function testConnection (){  // TODO : remove test feature
  

  fetch('http://localhost:3001/sign_up/?name=pd&email=maxon@surf.pute&password=123',{ method: 'POST'}) // use POST method to push data
    .then(response => response.json())
    .then(users => console.log(users))
}

function App() {
  testConnection() // TODO : remove test feature
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
