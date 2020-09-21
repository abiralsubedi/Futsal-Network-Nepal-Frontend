import React from "react";
import PropTypes from "prop-types";

import { Editor } from "react-draft-wysiwyg";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import useStyles from "./style";

const TextEditor = ({ value, handleChange, placeholder }) => {
  const classes = useStyles();

  return (
    <Editor
      editorState={value}
      wrapperClassName={classes.editorWrapperRoot}
      toolbarClassName={classes.editorToolBarRoot}
      editorClassName={classes.editorContentRoot}
      onEditorStateChange={handleChange}
      placeholder={placeholder}
      toolbar={{
        options: [
          "inline",
          "blockType",
          "fontSize",
          "list",
          "textAlign",
          "colorPicker",
          "link",
          "remove",
          "history"
        ],
        inline: {
          options: [
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "superscript",
            "subscript"
          ]
        },
        blockType: {
          className: classes.blockTypeRoot,
          options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6", "Blockquote"]
        },
        fontSize: {
          className: classes.fontSizeRoot
        },
        colorPicker: {
          popupClassName: classes.colorPickerPopupRoot
        },
        link: {
          popupClassName: classes.linkPopupRoot
        }
      }}
    />
  );
};

TextEditor.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  handleChange: PropTypes.func,
  placeholder: PropTypes.string
};

export default TextEditor;
