import React from "react";
import Axios from "axios";

class FormReader extends React.Component {
  render() {
    var pageURL = window.location.href;
    var FormID = pageURL.substr(pageURL.lastIndexOf("/") + 1);
    // get Form content from FormID

    var FormContent = {
      // formcontent example
      title: "test",
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

    return <h1> {FormContent.title} </h1>;
  }
}

export default FormReader;
