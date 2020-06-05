import React from "react";
import Axios from "axios";

class FormValidation extends React.Component {
  constructor(props) {
    super(props);
    this.FormID = null;
    this.FormContent = null;
  }

  componentDidMount() {
    var pageURL = window.location.href;
    this.FormID = pageURL.substr(pageURL.lastIndexOf("/") + 1);
    let GetFormPromise = await Axios({
        method: "get",
        url: process.env.REACT_APP_API_URL + "/form/" + this.FormID,
        withCredentials: true,
      });
      this.FormContent = await GetFormPromise.data;
  }

  render() {
    return <h2>You've already respond to form "{this.FormContent.title}" </h2>;
  }
}

export default FormValidation;
