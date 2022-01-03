import React, { useState } from 'react';

// Components
import { EditorState } from 'draft-js';
// import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';

import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './WYSIWYG.css';

const WYSIWYGEditor = (props) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState('<div>abc</div>');

  const handleEditorChange = (state) => {
    setEditorState(state);
    return props.onChange(convertContentToHTML());
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  console.log(convertedContent);

  return (
    <div>
      <div className="editor">
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
      <div
        className="prose preview"
        dangerouslySetInnerHTML={createMarkup(convertedContent)}
      />
    </div>
  );
};

export default WYSIWYGEditor;
