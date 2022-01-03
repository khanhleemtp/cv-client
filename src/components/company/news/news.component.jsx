import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import AppEditor from './../../editor/editor.component';
import './list.style.css';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const News = () => {
  const { handleSubmit, control } = useForm({
    mode: 'onChange',
    defaultValues: {
      content: '',
    },
  });

  const handleSubmitOnClick = ({ content }) => {
    alert(content);
  };

  const abc = useWatch({ control, name: 'content' });
  return (
    <div>
      <form onSubmit={handleSubmit(handleSubmitOnClick)}>
        <AppEditor control={control} name="content" />
        <button type="submit">Submit</button>
      </form>
      {/* <Editor editorState={convertToRaw(convertFromHTML(abc))} readOnly /> */}
      <div
        className="preview prose"
        dangerouslySetInnerHTML={{ __html: abc }}
      ></div>
    </div>
  );
};

export default News;
