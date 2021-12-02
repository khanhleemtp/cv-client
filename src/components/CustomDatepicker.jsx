import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import 'moment/locale/vi';
import MomentLocaleUtils from 'react-day-picker/moment';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import moment from 'moment';
import { useFormContext, useWatch } from 'react-hook-form';

const CustomDatepicker = ({ name, cb }) => {
  const { setValue, control } = useFormContext();

  // useEffect(() => {
  //   register(name);
  // }, [name, register]);

  const handleDayClick = (day) => {
    console.log('day:', day);
    cb && cb();
    setValue(name, moment(day).toISOString(), { shouldDirty: true });
  };

  const selectedDays = useWatch({ control, name });

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
