import React from 'react';

const InputSelect = ({ register, name, options, label, error }) => {
  return (
    <div className="flex flex-col">
      <label className="mb-2">{label}</label>
      <select {...register(name)} className="form-select pr-8">
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default InputSelect;
