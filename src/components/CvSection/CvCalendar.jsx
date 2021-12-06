import React from 'react';
import { CalendarIcon } from '@heroicons/react/solid';
import { useWatch, useFormContext } from 'react-hook-form';
import moment from 'moment';
import PopoverSetting from './../PopoverSetting';
import CvDatepicker from './CvDatePicker';

const CvCalendar = ({ from, to, isOngoing, dayProps }) => {
  const { control } = useFormContext();
  const fromDate = useWatch({ control, name: from });
  const toDate = useWatch({ control, name: to });
  const isGoing = useWatch({ control, name: isOngoing });

  return (
    <PopoverSetting setting={<CvDatepicker dayProps={dayProps} />}>
      <div className="inline-flex items-center text-sm text-gray-500 cursor-pointer hover:bg-gray-200">
        <div className="text-blue-500 pointer-events-none w-4 h-4">
          <CalendarIcon />
        </div>
        <div>{fromDate && moment(fromDate).format('DD/MM/YYYY')}</div>
        <span className="mx-0.5">-</span>
        {isGoing ? (
          <div className="">Hiện tại</div>
        ) : (
          <div>{toDate && moment(toDate).format('DD/MM/YYYY')}</div>
        )}
      </div>
    </PopoverSetting>
  );
};

export default CvCalendar;
