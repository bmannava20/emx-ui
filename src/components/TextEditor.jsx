import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { draftToMarkdown, markdownToDraft } from "markdown-draft-js";
import PropTypes from "prop-types";
import React from "react";
import { Editor } from "react-draft-wysiwyg";

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    const draftToMarkObj = this.props.data && this.props.data.description;
    const rawData = markdownToDraft(draftToMarkObj);
    const contentState = convertFromRaw(rawData);
    const newEditorState = EditorState.createWithContent(contentState);
    this.state = {
      editorState: newEditorState,
      readOnly: this.props.readOnly,
      wrapperClass: this.props.readOnly ? "" : "textEditor"
    };
    this.onEditorStateChange = (editorState) => {
      this.setState(
        {
          editorState
        },
        this.updateDescription
      );
    };
  }

  updateDescription = () => {
    if (!this.state.readOnly) {
      const longDescription = draftToMarkdown(
        convertToRaw(this.state.editorState.getCurrentContent())
      );
      const data = this.props.data;
      data.description = longDescription;
      this.props.setData(data);
    }
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          wrapperClassName={this.state.wrapperClass}
          onEditorStateChange={this.onEditorStateChange}
          readOnly={this.state.readOnly}
          toolbarHidden={this.state.readOnly}
          editorState={editorState}
        />
      </div>
    );
  }
}

TextEditor.propTypes = {
  description: PropTypes.object,
  data: PropTypes.object,
  setData: PropTypes.func
};

export default TextEditor;
