import { Controller, useFormContext } from 'react-hook-form';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useDispatch } from 'react-redux';
import { updateCvStart } from '../../../../redux/cv/cv.action';

// import { useEffect } from 'react';

const CvSlider = ({ name }) => {
  const { control, getValues } = useFormContext();

  const dispatch = useDispatch();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <Slider
          min={0}
          max={10}
          step={2}
          value={value}
          handleStyle={{
            width: 16,
            height: 16,
            backgroundColor: '#111',
            border: 0,
          }}
          railStyle={{ backgroundColor: '#E7E5E4', height: 8 }}
          trackStyle={{ backgroundColor: '#3B82F6', height: 8 }}
          onChange={(value) => {
            onChange(value);
            const cvData = getValues();
            dispatch(updateCvStart({ updateData: cvData, id: cvData.id }));
          }}
        />
      )}
    />
  );
};

export default CvSlider;
