import { Controller, useFormContext } from 'react-hook-form';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { connect } from 'react-redux';
import { updateCvStart } from '../../../../redux/cv/cv.action';
import { setFields } from '../../../../redux/viewState/viewState.action';

// import { useEffect } from 'react';

const CvSlider = ({ name, setInput, updateCv }) => {
  const { control, getValues } = useFormContext();

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
            setInput();
            updateCv({ updateData: cvData, id: cvData.id });
          }}
        />
      )}
    />
  );
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  setInput: () =>
    dispatch(
      setFields({
        item: ownProps?.item,
        section: ownProps?.section,
        field: ownProps?.name,
      })
    ),

  updateCv: (data) => dispatch(updateCvStart(data)),
});

export default connect(null, mapDispatchToProps)(CvSlider);
