import { Switch } from '@headlessui/react';
import { Controller, useFormContext } from 'react-hook-form';

const BaseSwitch = ({ name, label, func = () => {}, disabled = false }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Switch.Group>
          <div className="flex items-center justify-between space-x-2">
            <Switch.Label className="w-3/4 font-semibold">{label}</Switch.Label>
            <Switch
              disabled={disabled}
              checked={value}
              onChange={(e) => {
                onChange(e);
                func();
              }}
              className={`${
                value ? 'bg-blue-600' : 'bg-gray-200'
              } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              <span
                className={`${
                  value ? 'translate-x-6' : 'translate-x-1'
                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
              />
            </Switch>
          </div>
        </Switch.Group>
      )}
    />
  );
};

export default BaseSwitch;
