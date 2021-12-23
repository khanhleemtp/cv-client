import clsx from 'clsx';
import { useFormContext, useWatch } from 'react-hook-form';
import CustomSwitch from '../../../CustomSwitch';
import { updateCvStart } from './../../../../redux/cv/cv.action';
import { connect } from 'react-redux';

const CvConfigProfile = ({ updateCv }) => {
  const { control, setValue, getValues } = useFormContext();

  const updateData = () => {
    const cvData = getValues();
    updateCv({ updateData: cvData, id: cvData.id });
  };

  const photoStyle = useWatch({
    control,
    name: 'header.photoStyle', // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
  });

  return (
    <div className="p-6 w-64">
      <CustomSwitch name="header.showTitle" label="Vị trí công việc" />
      <CustomSwitch name="header.showPhone" label="Số điện thoại" />
      <CustomSwitch name="header.showEmail" label="Email" />
      <CustomSwitch name="header.showLink" label="Website/Link" />
      <CustomSwitch name="header.showAddress" label="Địa chỉ" />
      <CustomSwitch name="header.showPhoto" label="Ảnh" />

      <div className="flex">
        Photo style
        <div
          className={clsx(
            'w-5 h-5 mx-1 rounded-full bg-gray-500 cursor-pointer',
            {
              'bg-blue-500': photoStyle === 'rounded',
            }
          )}
          onClick={() => {
            setValue('header.photoStyle', 'rounded');
            updateData();
          }}
        ></div>
        <div
          className={clsx('w-5 h-5 mx-1  bg-gray-500 cursor-pointer', {
            'bg-blue-500': photoStyle === 'square',
          })}
          onClick={() => {
            setValue('header.photoStyle', 'square');
            updateData();
          }}
        ></div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateCv: (data) => dispatch(updateCvStart(data)),
});

export default connect(null, mapDispatchToProps)(CvConfigProfile);
