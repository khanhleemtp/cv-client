import { Switch } from '@headlessui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { updateCvStart } from './../redux/cv/cv.action';
import { connect } from 'react-redux';

const CustomSwitch = ({ name, label, cb, updateCv }) => {
  const { control, getValues } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Switch.Group>
          <div className="flex items-center justify-between my-2">
            <Switch.Label className="">{label}</Switch.Label>
            <Switch
              checked={value}
              onChange={(e) => {
                cb && cb();
                onChange(e);
                const cvData = getValues();
                updateCv({ updateData: cvData, id: cvData.id });
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

const mapDispatchToProps = (dispatch) => ({
  updateCv: (data) => dispatch(updateCvStart(data)),
});

export default connect(null, mapDispatchToProps)(CustomSwitch);
