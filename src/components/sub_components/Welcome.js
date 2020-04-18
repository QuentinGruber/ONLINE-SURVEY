/*

TEST COMPONENT TO REMOVE OR TO CHANGE AT LEAST

*/
import React from "react";
import Axios from "axios";

class Welcome extends React.Component {
  constructor(props) {
    super(props);

    // Define the initial state:
    this.state = {
      name: "inconnu",
    };
  }

  change_name(username, change_name_interval) {
    if (username !== undefined) {
      if (username.length > 2 && this.state.name === "inconnu") {
        console.warn(username);
        this.setState({
          name: username,
        });
        clearInterval(change_name_interval);
      }
    }
  }

  async componentDidMount() {
    let User = await Axios({
      method: "get",
      url: process.env.REACT_APP_API_URL + "/welcome",
      withCredentials: true,
    });
    this.setState({ name: User.data });
  }

  render() {
    return <h1> Bonjour {this.state.name} </h1>;
  }
}

export default Welcome;
