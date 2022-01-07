import './editor-preview.style.scss';
import DOMPurify from 'dompurify';

const EditorPreview = ({ element = null }) => {
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <div className="unreset" dangerouslySetInnerHTML={createMarkup(element)} />
  );
};

export default EditorPreview;
