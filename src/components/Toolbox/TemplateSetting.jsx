import { useFormContext } from 'react-hook-form';
import { updateCvStart } from './../../redux/cv/cv.action';
import { useDispatch } from 'react-redux';

const TemplateSetting = () => {
  const { setValue, getValues } = useFormContext();
  const dispatch = useDispatch();

  const setTemplate = (layout) => () => {
    setValue('style.layout', layout);
    const cvData = getValues();
    dispatch(
      updateCvStart({
        updateData: cvData,
        id: cvData?.id,
      })
    );
  };

  return (
    <div className="bg-white p-6 w-64">
      <div
        className="bg-gray-200 cursor-pointer p-2 mb-1"
        onClick={setTemplate('single')}
      >
        Một cột
      </div>
      <div
        className="bg-gray-200 cursor-pointer p-2 mb-1"
        onClick={setTemplate('double')}
      >
        Hai cột
      </div>
    </div>
  );
};

export default TemplateSetting;
