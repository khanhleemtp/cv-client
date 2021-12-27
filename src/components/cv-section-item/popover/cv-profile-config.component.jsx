import clsx from 'clsx';
import { useFormContext, useWatch } from 'react-hook-form';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCvHeader } from '../../../redux/cv/cv.selectors';
import { updateCvStart } from '../../../redux/cv/cv.action';
import CvListSwitch from './cv-list-switch.component';
import { DATA_SECTION_CONFIG } from './configData';

const CvConfigProfile = ({ updateCv, header }) => {
  const { control, setValue, getValues } = useFormContext();

  const updateData = () => {
    const cvData = getValues();
    updateCv({ updateData: cvData, id: cvData.id });
  };

  const photoStyle = useWatch({
    control,
    name: 'header.photoStyle', // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
    defaultValue: header?.photoStyle,
  });

  const handlePhotoStyle = (style) => () => {
    setValue('header.photoStyle', style);
    updateData();
  };

  return (
    <div className="p-6 w-64">
      <CvListSwitch list={DATA_SECTION_CONFIG.profile} profile={true} />

      <div className="flex">
        Photo style
        <div
          className={clsx(
            'w-5 h-5 mx-1 rounded-full bg-gray-500 cursor-pointer',
            {
              'bg-blue-500': photoStyle === 'rounded',
            }
          )}
          onClick={handlePhotoStyle('rounded')}
        ></div>
        <div
          className={clsx('w-5 h-5 mx-1  bg-gray-500 cursor-pointer', {
            'bg-blue-500': photoStyle === 'square',
          })}
          onClick={handlePhotoStyle('square')}
        ></div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  header: selectCvHeader,
});

const mapDispatchToProps = (dispatch) => ({
  updateCv: (data) => dispatch(updateCvStart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CvConfigProfile);
