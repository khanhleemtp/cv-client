import { useState } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import 'moment/locale/vi';
import MomentLocaleUtils from 'react-day-picker/moment';
import moment from 'moment';
import { useWatch, useFormContext } from 'react-hook-form';
import './input-date.style.css';
import SelectMonthAndYear from './select-month-year.component';
moment.locale('vi');

const DatePicker = ({ name }) => {
  const currentYear = new Date().getFullYear();
  const fromMonth = new Date(currentYear, 0);
  const toMonth = new Date(currentYear + 10, 11);

  const { control, setValue } = useFormContext();

  const [month, setMonth] = useState(fromMonth);

  const handleYearMonthChange = (monthSelect) => {
    setMonth(monthSelect);
  };

  const handleDayClick = (day) => {
    setValue(name, moment(day).toISOString(), { shouldDirty: true });
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

export default DatePicker;
