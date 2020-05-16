import React from "react";
import ContentEditable from "react-contenteditable";

class FormTitle extends React.Component {
  render() {
    return (
      <ContentEditable
        innerRef={this.contentEditable}
        html={this.props.title} // innerHTML of the editable div
        disabled={false} // use true to disable editing
        className="form-title"
        data-placeholder="Titre du formulaire"
        onChange={(e) => this.props.handleChangeTitle(e.target.value)}
        onKeyPress={(evt) => {
          if (evt.which === 13) {
            evt.preventDefault();
          }
        }}
        onPaste={(e) => {
          e.preventDefault();
          var text = e.clipboardData.getData("text/plain");
          text = text.replace(/(?:\r\n|\r|\n)/g, " ");
          document.execCommand("insertText", false, text);
        }}
      ></ContentEditable>
    );
  }
}

export default FormTitle;
