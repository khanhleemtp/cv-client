import { useEffect } from 'react';
import { TrashIcon, UserIcon, CloudUploadIcon } from '@heroicons/react/outline';
import { useFormContext, useWatch } from 'react-hook-form';
import { openModal } from '../../redux/viewState/viewState.action';
import { connect } from 'react-redux';
import { updateCvStart } from '../../redux/cv/cv.action';
import { createStructuredSelector } from 'reselect';
import { selectCvPhoto } from './../../redux/cv/cv.selectors';

const CvProfileImage = ({ name, openImageModal, updateCv, photo }) => {
  const { getValues, setValue, control } = useFormContext();

  useEffect(() => {
    setValue(name, photo);
  }, [setValue, photo, name]);

  const image = useWatch({ name, control });

  const handleRemoveImageProfile = () => {
    setValue(name, '');
    const cvData = getValues();
    updateCv({
      id: cvData.id,
      updateData: cvData,
    });
  };

  return (
    <div className="relative w-32 h-32 rounded-full group cursor-pointer hidden md:block">
      <>
        <div className="absolute inset-0 rounded-full hidden group-hover:flex items-center justify-center bg-gray-800 opacity-60"></div>
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
        <div className="w-full h-full rounded-full bg-gray-200">
          {image ? (
            <img src={image} className="w-full h-full rounded-full" alt="pt" />
          ) : (
            <UserIcon className="w-full h-full p-2 text-gray-400" />
          )}
        </div>
      </>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  openImageModal: () => dispatch(openModal('UPLOAD_IMAGE')),
  updateCv: (data) => dispatch(updateCvStart(data)),
});
const mapStateToProps = createStructuredSelector({
  photo: selectCvPhoto,
});

export default connect(mapStateToProps, mapDispatchToProps)(CvProfileImage);
