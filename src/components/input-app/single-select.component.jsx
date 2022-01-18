import Select from 'react-select';
import { Controller } from 'react-hook-form';

const SingleSelect = ({
  control,
  name,
  label = '',
  placeholder = '',
  options,
  className,
}) => {
  return (
    <div className={className}>
      {label && <div className="mb-2">{label}</div>}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, ref } }) => (
          <Select
            inputRef={ref}
            components={{
              // DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
              // IndicatorsContainer: () => null,
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

export default SingleSelect;
