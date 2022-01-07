import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML, convertFromHTML } from 'draft-convert';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './WYSIWYG.css';

const WYSIWYGEditor = (props) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(convertFromHTML(props?.value))
  );

  const handleEditorChange = async (state) => {
    setEditorState(state);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    return props.onChange(currentContentAsHTML);
  };

  return (
    <div>
      <div className="editor w-full">
        <Editor
          editorState={editorState}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          onEditorStateChange={handleEditorChange}
          toolbar={{
            options: ['inline', 'list', 'history'],
            inline: {
              inDropdown: false,
              options: ['bold', 'italic', 'underline'],
            },
            list: {
              inDropdown: false,
              options: ['unordered', 'ordered', 'indent', 'outdent'],
            },
          }}
        />
      </div>
    </div>
  );
};

export default WYSIWYGEditor;
