import { Controller, useFormContext } from 'react-hook-form';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const CvSlider = ({ name, placeholder }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <div>
          <Slider
            min={0}
            max={10}
            step={2}
            value={value}
            handleStyle={{
              width: 16,
              height: 16,
            }}
            railStyle={{ backgroundColor: '#E7E5E4', height: 8 }}
            trackStyle={{ backgroundColor: '#3B82F6', height: 8 }}
            onChange={(value) => onChange(value)}
          />
        </div>
      )}
    />
  );
};

export default CvSlider;
