import React from "react";
import Axios from "axios";

class FormValidation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { FormContent: { title: "" } };
  }

  async componentDidMount() {
    let GetFormPromise = await Axios({
      method: "get",
      url: process.env.REACT_APP_API_URL + "/form/" + this.props.FormID,
      withCredentials: true,
    });
    this.setState({ FormContent: GetFormPromise.data });
  }

  render() {
    return (
      <h2>You've already respond to form "{this.state.FormContent.title}" </h2>
    );
  }
}

export default FormValidation;
