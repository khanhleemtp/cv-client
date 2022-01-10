import { XIcon } from '@heroicons/react/solid';
import { UserIcon, TrashIcon } from '@heroicons/react/outline';
import Button from '../button/button.component';
import 'cropperjs/dist/cropper.css';
import React, { useState } from 'react';
import CropImage from './CropImage';
import { connect } from 'react-redux';
import { closeModal } from '../../redux/viewState/viewState.action';
import { createStructuredSelector } from 'reselect';
import { updateCompanyStart } from './../../redux/company/company.action';
import { selectUpdatingCompany } from './../../redux/company/company.selectors';
import { selectCompanyInOtherPropsModal } from './../../redux/viewState/viewState.selectors';

const CompanyUploadImage = ({
  modalRef,
  close,
  updateCompany,
  company,
  isUpdating,
}) => {
  console.log('company in CompanyUploadImage', company.id);

  const [image, setImage] = useState('');
  const [cropData, setCropData] = useState(company?.logo);
  const [cropper, setCropper] = useState();
  const onChange = (e) => {
    e.preventDefault();
    setCropData(null);
    const image = e.target.files[0];
    if (!image) {
      alert('Bạn chưa tải ảnh');
      return false;
    }
    if (!image.name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
      alert('Định dạng ảnh cần là jpg/png');
      return false;
    }
    if (image.size > 500000) {
      alert('File quá lớn');
      return false;
    }
    // setError('');
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      // base 64 IMG
      const newImage = cropper.getCroppedCanvas().toDataURL();
      setCropData(newImage);
      updateImage(newImage);
    }
    setImage('');
  };

  const updateImage = (img) => {
    // formData.append('photo', file);

    // convert base64 to Blob and append to form-data
    fetch(img)
      .then((res) => res.blob())
      .then((blob) => {
        let formData = new FormData();
        formData.append('logo', blob, 'logo-image');
        formData.append('host', company.host);
        // call API To Upload
        updateCompany({
          updateData: formData,
          id: company.id,
          config: {
            'Content-Type': 'multipart/form-data',
          },
        });
      });
  };

  const handleRemoveImage = () => {
    setCropData(null);
    updateCompany({
      id: company.id,
      updateData: {
        isObject: true,
        host: company.host,
        logo: '',
      },
    });
  };
  return (
    <div className="bg-white mx-2 shadow-lg rounded-lg w-full p-6">
      <div className="flex items-center justify-between">
        <p>Ảnh</p>
        <button
          ref={modalRef}
          onClick={close}
          className="text-indigo-500 hover:text-indigo-300"
        >
          <XIcon className="w-6 h-6" />
        </button>
      </div>

      {/* TODO CROP_IMAGE */}
      <div className="flex items-center justify-center">
        {!image ? (
          !cropData && (
            <div className="w-44 h-44 rounded-full p-2 bg-gray-200">
              <UserIcon className="w-full h-full text-gray-400" />
            </div>
          )
        ) : (
          <CropImage image={image} setCropper={setCropper} />
        )}

        {/* TODO DISPlAY_IMAGE */}
        {cropData && (
          <div className="relative w-44 h-44 ring-1 rounded-full group cursor-pointer">
            {isUpdating ? (
              <div className="text-center mt-12 text-indigo-500">
                Đang tải lên..
              </div>
            ) : (
              <>
                <div className="absolute inset-0 rounded-full hidden group-hover:flex items-center justify-center bg-gray-800 opacity-60"></div>

                <div className="absolute z-10 inset-0 rounded-full hidden group-hover:flex items-center justify-center">
                  <TrashIcon
                    className="bg-indigo-500 text-white w-12 h-12 rounded-full p-2"
                    onClick={handleRemoveImage}
                  />
                </div>

                <img
                  src={cropData}
                  className="w-full h-full rounded-full"
                  alt="pt"
                />
              </>
            )}
          </div>
        )}
      </div>

      {/* TODO NAV MODAL */}
      <div className="flex items-center justify-between mt-12">
        {image ? (
          <>
            <Button
              type="outline"
              text="Trở về"
              onClick={() => {
                setImage('');
                setCropData(company?.photo);
              }}
            />
            <Button text="Đồng ý" onClick={getCropData} />
          </>
        ) : (
          <>
            <div className="relative">
              {!image && (
                <input
                  type="file"
                  onChange={onChange}
                  className="absolute inset-0 opacity-0"
                />
              )}
              <Button type="outline" text="Tải ảnh lên" />
            </div>
            <Button text="Đồng ý" onClick={close} />
          </>
        )}
      </div>
      {/*  */}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  company: selectCompanyInOtherPropsModal,
  isUpdating: selectUpdatingCompany,
});

const mapDispatchToProps = (dispatch) => ({
  close: () => dispatch(closeModal()),
  updateCompany: (data) => dispatch(updateCompanyStart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyUploadImage);
