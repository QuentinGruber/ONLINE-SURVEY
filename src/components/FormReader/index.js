import React from "react";
import Axios from "axios";
import TextQuestion from "./TextQuestion";
import RadioQuestion from "./RadioQuestion";
import { Form } from "reactstrap";

class FormReader extends React.Component {
  render() {
    var pageURL = window.location.href;
    var FormID = pageURL.substr(pageURL.lastIndexOf("/") + 1);
    // get Form content from FormID

    var FormContent = {
      // formcontent example
      title: "test titre",
      content: [
        { index: 1, title: "test", type: "text", p_answer: "tg" },
        {
          index: 2,
          title: "ee",
          type: "radio",
          p_answer: [
            { text: "réponzdzse1", checked: true },
            { text: "zdzd", checked: false },
            { text: "dzzzzzzzzzz", checked: false },
          ],
        },
      ],
    };
    var items = [];
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
    return (
      <>
        <h1> {FormContent.title} </h1>
        <Form action="" method="post">
          {items}
          <div>
            <input type="submit" value="Send"></input>
          </div>
        </Form>
      </>
    );
  }
}

export default FormReader;
