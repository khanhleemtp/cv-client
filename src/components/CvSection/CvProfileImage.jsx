import { useEffect } from 'react';
import { TrashIcon, UserIcon, CloudUploadIcon } from '@heroicons/react/outline';
import { useFormContext, useWatch } from 'react-hook-form';
import { openModal } from '../../redux/viewState/viewState.action';
import { connect } from 'react-redux';
import { updateCvStart } from '../../redux/cv/cv.action';
import { createStructuredSelector } from 'reselect';
import { selectCvPhoto } from './../../redux/cv/cv.selectors';
import clsx from 'clsx';

const CvProfileImage = ({ name, openImageModal, updateCv, photo }) => {
  const { getValues, setValue, control } = useFormContext();

  useEffect(() => {
    setValue(name, photo);
  }, [setValue, photo, name]);

  const image = useWatch({ name, control });
  const photoStyle = useWatch({ name: 'header.photoStyle', control });

  const handleRemoveImageProfile = () => {
    setValue(name, '');
    const cvData = getValues();
    updateCv({
      id: cvData.id,
      updateData: cvData,
    });
  };

  let styles = [
    {
      'rounded-sm': Boolean(photoStyle === 'square'),
    },
    {
      'rounded-full': Boolean(photoStyle === 'rounded'),
    },
  ];

  return (
    <div
      className={clsx(
        'relative w-32 h-32  group cursor-pointer hidden md:block',
        ...styles
      )}
    >
      <>
        <div
          className={clsx(
            'absolute inset-0 hidden group-hover:flex items-center justify-center bg-gray-800 opacity-60',
            ...styles
          )}
        ></div>
        <div className="absolute z-10 inset-0 rounded-full hidden group-hover:flex items-center justify-center">
          <CloudUploadIcon
            className="bg-green-500 text-white w-8 h-8 rounded-full p-2"
            onClick={openImageModal}
          />
          <span className="mx-1"></span>
          <TrashIcon
            className="bg-red-500 text-white w-8 h-8 rounded-full p-2"
            onClick={handleRemoveImageProfile}
          />
        </div>
        <div className={clsx('w-full h-full bg-gray-200', ...styles)}>
          {image ? (
            <img
              src={image}
              className={clsx('w-full h-full', ...styles)}
              alt="pt"
            />
          ) : (
            <UserIcon
              className={clsx('w-full h-full p-2 text-gray-400', ...styles)}
            />
          )}
        </div>
      </>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  openImageModal: () => dispatch(openModal('UPLOAD_IMAGE'), {}),
  updateCv: (data) => dispatch(updateCvStart(data)),
});
const mapStateToProps = createStructuredSelector({
  photo: selectCvPhoto,
});

export default connect(mapStateToProps, mapDispatchToProps)(CvProfileImage);
