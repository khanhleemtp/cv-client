import { useState } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import 'moment/locale/vi';
import MomentLocaleUtils from 'react-day-picker/moment';
import moment from 'moment';
import { useFormContext, useWatch } from 'react-hook-form';
import './CustomDatePicker.css';
import SelectMonthAndYear from './SelectMonthAndYear';

const CustomDatepicker = ({ name, cb, updateData }) => {
  const currentYear = new Date().getFullYear();
  const fromMonth = new Date(currentYear - 11, 0);
  const toMonth = new Date(currentYear + 5, 11);
  const { setValue, control } = useFormContext();

  const [month, setMonth] = useState(fromMonth);

  const handleYearMonthChange = (monthSelect) => {
    setMonth(monthSelect);
  };

  const handleDayClick = (day) => {
    cb && cb();
    setValue(name, moment(day).toISOString(), { shouldDirty: true });
    updateData && updateData();
  };

  const selectedDays = useWatch({ control, name });

  return (
    // <div className="YearNavigation">
    <DayPicker
      locale="vi"
      month={month}
      fromMonth={fromMonth}
      toMonth={toMonth}
      localeUtils={MomentLocaleUtils}
      captionElement={({ date, localeUtils }) => (
        <SelectMonthAndYear
          currentYear={currentYear}
          fromMonth={fromMonth}
          toMonth={toMonth}
          date={date}
          localeUtils={localeUtils}
          onChange={handleYearMonthChange}
        />
      )}
      onDayClick={handleDayClick}
      selectedDays={moment.utc(selectedDays).toDate()}
    />
    // </div>
  );
};

export default CustomDatepicker;
