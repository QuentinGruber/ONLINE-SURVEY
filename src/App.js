import React from 'react';
import logo from './logo.svg';
import './App.css';


function testConnection (){  // TODO : remove test feature
  /*
  var headers = {
    "Content-Type": "application/json",
    "client_id": "1001125",
    "client_secret": "876JHG76UKFJYGVHf867rFUTFGHCJ8JHV"
  }
  j'ai trouvé ça interéssant qu'on puisse modifier si facilement les hearders
  */
  var data = { // test data pour enregistrer un user
    "Pseudo": "maxon",
    "Name": "maxon",
    "Email": "maxon@surf.com",
    "Password": "maxon"
  }
  fetch('http://localhost:3001/usersdb',{ method: 'POST', body: data}) // use POST method to push data
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
