import React from "react";
import Axios from "axios";
import TextQuestion from "./TextQuestion";
import RadioQuestion from "./RadioQuestion";
import { Form, Button } from "reactstrap";

import { GlobalStyle } from "./styles";
import FormValidation from "../FormValidation";

class FormReader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { FormContent: null, items: [], HasAnswered: false };
    this.FormID = null;
    this.SendAnswers = this.SendAnswers.bind(this);
  }

  async SendAnswers() {
    var inputs = document.getElementById("Form").elements;
    var inputs_data = [];
    for (let i = 0; i < inputs.length - 1; i++) {
      switch (inputs[i].type) {
        case "text":
          if (inputs[i].value != "") {
            inputs_data.push({
              answerid: inputs[i].id,
              questionid: inputs[i].attributes[1].nodeValue,
              value: inputs[i].value,
            });
          }
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
        default:
          console.error("Unknown answer type : " + inputs[i].type);
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

    let Check_validation_promise = await Axios({
      method: "get",
      url: process.env.REACT_APP_API_URL + "/HasAnswered/" + this.FormID,
      withCredentials: true,
    });

    if (!Check_validation_promise.data) {
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
              items.push(
                <TextQuestion key={i} data={FormContent.content[i]} />
              );
              break;
            case "radio":
              items.push(
                <RadioQuestion key={i} data={FormContent.content[i]} />
              );
              break;

            default:
              console.error(
                "Unknown question type : " + FormContent.content[i].type
              );
              break;
          }
        }
        this.setState({ FormContent: FormContent, items: items });
      } else {
        alert("You don't have access to this Form or he doesn't exist !");
        document.location.href = "/form/new";
      }
    } else {
      this.setState({ HasAnswered: true });
    }
  }

  render() {
    if (!this.state.HasAnswered) {
      return (
        <>
          <GlobalStyle />
          {this.state.FormContent != null ? (
            <>
              <Form id="Form" className="fullCard bg-secondary shadow border-0">
                <div className="form-title">
                  {" "}
                  {this.state.FormContent.title}{" "}
                </div>
                {this.state.items}
                <div className="card-bottom">
                  <Button
                    className="btn-icon send-form-button"
                    color="default"
                    onClick={() => {
                      if (document.forms["Form"].reportValidity())
                        this.SendAnswers();
                    }}
                    value="Send"
                  >
                    Envoyer
                  </Button>
                </div>
              </Form>
            </>
          ) : null}
        </>
      );
    } else {
      return <FormValidation FormID={this.FormID} />;
    }
  }
}

export default FormReader;
