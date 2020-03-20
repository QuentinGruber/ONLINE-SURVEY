/*

TEST COMPONENT TO REMOVE OR TO CHANGE AT LEAST

*/
import React from 'react';

class Welcome extends React.Component {
  constructor() {
    super();

    // Define the initial state:
    this.state = {
      name: "inconnu"
    };
  }

   change_name = (username,change_name_interval) => {

    if(username !== undefined){
    if (username.length > 2 && this.state.name === "inconnu") {
      console.warn(username)
      this.setState({
        name: username
      })
     // clearInterval(change_name_interval)
    }
  }
    console.log(username)
  }

  render() {
    let username;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () { // handle request response
      if (this.readyState === 4 && this.status === 200) {
        username = this.responseText
      }
    };



    let change_name_interval = setInterval(() => this.change_name(username),100) // need to stop that at some point
    
    // Send a post request
    xhttp.open("GET", process.env.REACT_APP_API_URL + "/welcome", true);
    xhttp.withCredentials = true;
    xhttp.send();
    return (<h1> Bonjour {this.state.name} </h1>)

  }
}

export default Welcome;