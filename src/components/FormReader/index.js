import React from "react";
import Axios from "axios";
import TextQuestion from "./TextQuestion";
import RadioQuestion from "./RadioQuestion";
import { Form, Button } from "reactstrap";

class FormReader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { FormContent: null, items: [] };
    this.FormID = null;
    this.SendAnswers = this.SendAnswers.bind(this);
  }

  async SendAnswers() {
    var inputs = document.getElementById("Form").elements;
    var inputs_data = [];
    for (let i = 0; i < inputs.length - 1; i++) {
      switch (inputs[i].type) {
        case "text":
          inputs_data.push({
            answerid: inputs[i].id,
            questionid: inputs[i].attributes[0].nodeValue,
            value: inputs[i].value,
          });
          break;
        case "radio":
          if (inputs[i].checked) {
            inputs_data.push({
              answerid: inputs[i].id,
              questionid: inputs[i].attributes[0].nodeValue,
              value: inputs[i].labels[0].textContent,
            });
          }
          break;
      }
    }

    let SendAnswer_promise = await Axios({
      method: "post",
      url: process.env.REACT_APP_API_URL + "/send_form/" + this.FormID,
      withCredentials: true,
      data: inputs_data,
    });
    if (SendAnswer_promise.data) {
      alert("Succesfully send answers");
    } else {
      alert("Something went wrong , your maybe disconnected ?");
    }
  }

  async componentDidMount() {
    var pageURL = window.location.href;
    this.FormID = pageURL.substr(pageURL.lastIndexOf("/") + 1);
    // get Form content from FormID

    let GetFormPromise = await Axios({
      method: "get",
      url: process.env.REACT_APP_API_URL + "/form/" + this.FormID,
      withCredentials: true,
    });
    let FormContent = await GetFormPromise.data;
    if (FormContent) {
      let items = [];
      for (let i = 0; i < FormContent.content.length; i++) {
        switch (FormContent.content[i].type) {
          case "text":
            items.push(<TextQuestion key={i} data={FormContent.content[i]} />);
            break;
          case "radio":
            items.push(<RadioQuestion key={i} data={FormContent.content[i]} />);
            break;
        }
      }
      this.setState({ FormContent: FormContent, items: items });
    } else {
      alert("You don't have access to this Form or he doesn't exist !");
      document.location.href = "/form/new";
    }
  }

  render() {
    return (
      <>
        {this.state.FormContent != null ? (
          <>
            <h1> {this.state.FormContent.title} </h1>
            <Form id="Form">
              {this.state.items}
              <div>
                <Button
                  onClick={() => {
                    if (document.forms["Form"].reportValidity())
                      this.SendAnswers();
                  }}
                  value="Send"
                ></Button>
              </div>
            </Form>
          </>
        ) : null}
      </>
    );
  }
}

export default FormReader;