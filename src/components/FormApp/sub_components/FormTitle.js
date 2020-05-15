import React from "react";
import ContentEditable from "react-contenteditable";

class FormTitle extends React.Component {
  render() {
    let title;
    if (this.props.title == "") title = "Titre du formulaire";
    else title = this.props.title;
    return (
      <ContentEditable
        innerRef={this.contentEditable}
        html={title} // innerHTML of the editable div
        disabled={false} // use true to disable editing
        className="form-edit-title"
        onChange={(e) => this.props.handleChangeTitle(e.target.value)}
      ></ContentEditable>
    );
  }
}

export default FormTitle;
