import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import 'moment/locale/vi';
import MomentLocaleUtils from 'react-day-picker/moment';
import moment from 'moment';
import { useFormContext, useWatch } from 'react-hook-form';
import './CustomDatePicker.css';

const CustomDatepicker = ({ name, cb, updateData }) => {
  const { setValue, control } = useFormContext();

  const handleDayClick = (day) => {
    cb && cb();
    setValue(name, moment(day).toISOString(), { shouldDirty: true });
    updateData && updateData();
  };

  const selectedDays = useWatch({ control, name });

  return (
    <>
      <DayPicker
        localeUtils={MomentLocaleUtils}
        locale="vi"
        onDayClick={handleDayClick}
        selectedDays={moment.utc(selectedDays).toDate()}
      />
    </>
  );
};

export default CustomDatepicker;
