import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from './cropImage';
import Slider from 'react-input-slider';

const ImageCropper = ({ getBlob, inputImg }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  /* onCropComplete() will occur each time the user modifies the cropped area, 
    which isn't ideal. A better implementation would be getting the blob 
    only when the user hits the submit button, but this works for now  */
  const onCropComplete = async (_, croppedAreaPixels) => {
    const croppedImage = await getCroppedImg(inputImg, croppedAreaPixels);
    getBlob(croppedImage);
  };

  return (
    /* need to have a parent with `position: relative` 
    to prevent cropper taking up whole page */
    <div className="absolute inset-0">
      <div className="absolute inset-x-0 top-0 bottom-20">
        <Cropper
          image={inputImg}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className="absolute bottom-0 left-1/2 right-1/2 transform -translate-x-1/2 h-20 flex items-center">
        <Slider
          axis="x"
          value={zoom}
          xmax={3}
          xmin={1}
          xstep={0.1}
          onChange={(e, zoom) => setZoom(zoom)}
        />
      </div>
    </div>
  );
};

export default ImageCropper;
