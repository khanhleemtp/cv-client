import React, { useState } from 'react';
import ImageCropper from './ImageCropper';

export default function UploadImage() {
  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  const [blob, setBlob] = useState(null);
  const [inputImg, setInputImg] = useState('');
  //   const [loading, setLoading] = useState(false);
  const getBlob = (blob) => {
    // pass blob up from the ImageCropper component
    setBlob(blob);
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const onInputChange = (e) => {
    // convert image file to base64 string
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        setInputImg(reader.result);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <p>Ảnh</p>
      <div className="relative">
        <ImageCropper getBlob={getBlob} inputImg={inputImg} />
      </div>
      <button onClick={() => toBase64(blob).then((data) => console.log(data))}>
        OK
      </button>
      <input type="file" hidden onChange={onInputChange} />
    </div>
  );
}
