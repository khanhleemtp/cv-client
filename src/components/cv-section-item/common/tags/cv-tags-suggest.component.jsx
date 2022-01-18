import Select from 'react-select';
import { Controller } from 'react-hook-form';
import { connect } from 'react-redux';
import { updateCvStart } from './../../../../redux/cv/cv.action';
import { setFields } from '../../../../redux/viewState/viewState.action';

const CvTagSuggests = ({
  control,
  name,
  placeholder = '',
  options,
  setInput,
}) => {
  return (
    <div className="w-full max-w-xs" onClick={setInput}>
      {/* <div className="mb-2">{label}</div> */}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, ref } }) => (
          <Select
            // onFocus={() => window.scrollTo(0, ref.current?.offsetTop || 0)}
            inputRef={ref}
            components={{
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
              IndicatorsContainer: () => null,
            }}
            isClearable={true}
            options={options}
            placeholder={placeholder}
            value={options.find((c) => c.value === value)}
            onChange={(val) => onChange(val?.value)}
            defaultInputValue=""
            noOptionsMessage={() => 'Không còn lựa chọn'}
          />
        )}
      />
    </div>
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

export default connect(null, mapDispatchToProps)(CvTagSuggests);
