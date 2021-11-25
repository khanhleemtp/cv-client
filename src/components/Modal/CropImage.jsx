import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const CropImage = ({ image, setCropper }) => {
  return (
    <div className="w-full p-6">
      {/* Cropper */}
      <div>
        <div className="w-full">
          <Cropper
            className="w-full h-80"
            zoomTo={0.5}
            initialAspectRatio={1}
            preview=".img-preview"
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            onInitialized={(instance) => {
              setCropper(instance);
            }}
            guides={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CropImage;
