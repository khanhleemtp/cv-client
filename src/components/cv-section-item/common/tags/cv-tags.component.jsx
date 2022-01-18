import { useFormContext } from 'react-hook-form';
import { updateCvStart } from '../../../../redux/cv/cv.action';
// import CvTypography from './../typography/cv-typography';
import { connect } from 'react-redux';
import { TECHNOLOGY_SKILL } from './../../../../data/input.data';
import CvTagsSuggests from './cv-tags-suggest.component';

const CvTags = ({ name, updateCv, item, section, fields, insert, remove }) => {
  const { getValues, control } = useFormContext();

  const updateData = () => {
    const cvData = getValues();
    updateCv({ id: cvData?.id, updateData: cvData });
  };

  const handleKeyPress = (event, l) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      insert(l + 1, { text: '' });
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
      updateData();
    }
  };

  return (
    <div className="grid grid-cols-2">
      {fields?.map((field, l) => (
        <div
          key={field._id}
          className="border-gray-400 rounded-lg mr-2 mb-2 text-center"
          onKeyPress={(e) => handleKeyPress(e, l)}
          onKeyDown={(e) => handleKeyDown(e, l)}
        >
          {/* <CvTypography
          name={`${name}.${l}.text`}
          className="text-center"
          type="h5"
          placeholder="Kỹ năng"
          item={item}
          section={section}
        /> */}
          <CvTagsSuggests
            options={TECHNOLOGY_SKILL}
            name={`${name}.${l}.text`}
            control={control}
            placeholder="kỹ năng"
            item={item}
            section={section}
          />
        </div>
      ))}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateCv: (data) => dispatch(updateCvStart(data)),
});

export default connect(null, mapDispatchToProps)(CvTags);
