import React from 'react';

class Disconnect extends React.Component {
    render() {
      function Disconnect(){ // not used right now
        // delete admin token
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
    }
      return (
        <button onClick={Disconnect}>Disconnect</button>
      );
    }
  }
  export default Disconnect;