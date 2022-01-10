import Select from 'react-select';
import { Controller } from 'react-hook-form';

const MultiSelect = ({
  control,
  name,
  label = '',
  placeholder = '',
  options,
  defaultValue,
}) => {
  return (
    <div className="w-full max-w-xs">
      <div className="mb-2">{label}</div>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, ref } }) => (
          <Select
            inputRef={ref}
            defaultValue={defaultValue}
            options={options}
            placeholder={placeholder}
            value={options.find((c) => c.value === value)}
            onChange={(val) => onChange(val.map((c) => c.value))}
            isMulti
            noOptionsMessage={() => 'Không còn lựa chọn'}
          />
        )}
      />
    </div>
  );
};

export default MultiSelect;
