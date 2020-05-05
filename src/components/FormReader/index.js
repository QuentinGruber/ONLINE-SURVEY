import React from "react";
import Axios from "axios";
import TextQuestion from "./TextQuestion";
import RadioQuestion from "./RadioQuestion";
import { Form } from "reactstrap";

class FormReader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { FormContent: null, items: [] };
  }
  async componentDidMount() {
    var pageURL = window.location.href;
    var FormID = pageURL.substr(pageURL.lastIndexOf("/") + 1);
    // get Form content from FormID

    let GetFormPromise = await Axios({
      method: "get",
      url: process.env.REACT_APP_API_URL + "/form/" + FormID,
      withCredentials: true,
    });
    let FormContent = await GetFormPromise.data;
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
    console.log(FormContent);
    this.setState({ FormContent: FormContent, items: items });
  }

  render() {
    return (
      <>
        {this.state.FormContent != null ? (
          <>
            <h1> {this.state.FormContent.title} </h1>
            <Form action="" method="post">
              {this.state.items}
              <div>
                <input type="submit" value="Send"></input>
              </div>
            </Form>
          </>
        ) : null}
      </>
    );
  }
}

export default FormReader;
