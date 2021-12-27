import { useFormContext } from 'react-hook-form';
import { updateCvStart } from '../../../../redux/cv/cv.action';
import CvTypography from './../typography/cv-typography';
import { connect } from 'react-redux';

const CvTags = ({ name, updateCv, item, section, fields, insert, remove }) => {
  const { setFocus, getValues } = useFormContext();

  const updateData = () => {
    const cvData = getValues();
    updateCv({ id: cvData?.id, updateData: cvData });
  };

  const handleKeyPress = (event, l) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      insert(l + 1, { text: '' }, { focusName: `${name}.${l + 1}` });
      updateData();
    }
  };

  const handleKeyDown = (event, l) => {
    const tags = getValues(`${name}`);
    if (!tags[l].text && event.key === 'Backspace') {
      event.preventDefault();
      if (l === 0) {
        return;
      }
      remove(l);
      setFocus(`${name}.${l - 1}.text`);
      updateData();
    }
  };

  return fields?.map((field, l) => (
    <div
      key={field._id}
      className="inline-flex border-2 border-gray-400 p-1 rounded-lg mr-2 mb-2 text-center w-32"
      onKeyPress={(e) => handleKeyPress(e, l)}
      onKeyDown={(e) => handleKeyDown(e, l)}
    >
      <CvTypography
        name={`${name}.${l}.text`}
        className="text-center"
        type="h5"
        placeholder="Kỹ năng"
        item={item}
        section={section}
      />
    </div>
  ));
};

const mapDispatchToProps = (dispatch) => ({
  updateCv: (data) => dispatch(updateCvStart(data)),
});

export default connect(null, mapDispatchToProps)(CvTags);
