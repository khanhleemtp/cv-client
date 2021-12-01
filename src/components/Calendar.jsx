import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import 'moment/locale/vi';
import MomentLocaleUtils from 'react-day-picker/moment';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useState } from 'react';
import moment from 'moment';
import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';

const Calendar = ({ dayProps }) => {
  const [selectedDay, setSelectedDay] = useState('2021-12-18T05:00:00.000Z');

  const { setValue } = useFormContext();

  const handleDayClick = (day) => {
    setSelectedDay(day);
    console.log(moment(day).toISOString());
    // setValue(dayProps, moment(day, 'DD/MM/YYYY'));
  };

  const [isFrom, setIsFrom] = useState(true);
  return (
    <>
      <HelmetProvider>
        <Helmet async>
          <style>{`   
          .DayPicker-Caption {
            text-transform: capitalize;
          }
          `}</style>
        </Helmet>
      </HelmetProvider>
      <div className="flex divide-opacity-20 items-center justify-around">
        <div
          onClick={() => setIsFrom(true)}
          className={clsx('p-2 flex-1 text-center cursor-pointer', {
            'bg-gray-400': isFrom,
          })}
        >
          Từ
        </div>
        <div
          className={clsx('p-2 flex-1 text-center cursor-pointer', {
            'bg-gray-400': !isFrom,
          })}
          onClick={() => setIsFrom(false)}
        >
          Đến
        </div>
      </div>

      {/* <div>{moment(selectedDay, 'ddd, DD MMM YYYY HH:mm:ss')}</div> */}
      <div>
        {selectedDay &&
          JSON.stringify(moment(selectedDay).format('DD/MM/YYYY'))}
      </div>
      {isFrom ? (
        <div className="w-full flex items-center justify-center">
          <DayPicker
            selectedDays={selectedDay}
            localeUtils={MomentLocaleUtils}
            locale="vi"
            onDayClick={handleDayClick}
          />
        </div>
      ) : (
        <div>
          <div className="w-32">
            {/* <CustomSwitch label="Hiện tại" /> */}
            Switch
          </div>
          <DayPicker
            selectedDays={selectedDay}
            localeUtils={MomentLocaleUtils}
            locale="vi"
            onDayClick={handleDayClick}
          />
        </div>
      )}
    </>
  );
};

export default Calendar;
