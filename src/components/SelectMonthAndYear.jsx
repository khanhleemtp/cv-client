import moment from 'moment';
import React from 'react';

moment.locale('vi');
function SelectMonthAndYear({ date, onChange, fromMonth, toMonth }) {
  //   const months = localeUtils.getMonths();

  const months = moment.monthsShort();

  const years = [];
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i);
  }

  const handleChange = function handleChange(e) {
    const { year, month } = e.target.form;
    onChange(new Date(year.value, month.value));
  };

  return (
    <div className="DayPicker-Caption">
      <div className="flex flex-wrap">
        <select
          name="month"
          onChange={handleChange}
          value={date.getMonth()}
          className="m-1 w-24 rounded-full px-2 py-0"
        >
          {months.map((month, i) => (
            <option key={month} value={i}>
              {month}
            </option>
          ))}
        </select>
        <select
          name="year"
          onChange={handleChange}
          value={date.getFullYear()}
          className="m-1 w-20 p-0 rounded-full px-2"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
export default SelectMonthAndYear;
