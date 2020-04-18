import React from "react";

class Disconnect extends React.Component {
  render() {
    function Disconnect() {
      // not used right now
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        // handle request response
        if (this.readyState === 4 && this.status === 200) {
          if (this.responseText !== "false") {
            window.location.reload();
          } else {
            alert("Error while trying to disconnect !");
          }
        }
      };
      // Send a post request
      xhttp.open("DELETE", process.env.REACT_APP_API_URL + "/Disconnect", true);
      xhttp.withCredentials = true;
      xhttp.send();
    }
    return <button onClick={Disconnect}>Disconnect</button>;
  }
}
export default Disconnect;
