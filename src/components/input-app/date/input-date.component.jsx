import moment from 'moment';
import { useWatch, useFormContext } from 'react-hook-form';
import PopoverSetting from '../../PopoverSetting';
import DatePicker from './date-picker.component';

const InputDate = ({ name, label }) => {
  const { control } = useFormContext();
  const date = useWatch({ control, name });

  return (
    <PopoverSetting name={name} setting={<DatePicker name={name} />}>
      <div className="my-2 space-y-2">
        <div>{label}</div>
        <div className="ring-2 py-2 ring-gray-200">
          {moment(date).format('DD/MM/YY')}
        </div>
      </div>
    </PopoverSetting>
  );
};

export default InputDate;
