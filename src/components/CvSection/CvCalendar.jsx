import React from 'react';
import { CalendarIcon } from '@heroicons/react/solid';
import { useWatch, useFormContext } from 'react-hook-form';
import moment from 'moment';

const CvCalendar = ({ from, to, isOngoing }) => {
  const { control } = useFormContext();
  const fromDate = useWatch({ control, name: from });
  const toDate = useWatch({ control, name: to });
  const isGoing = useWatch({ control, name: isOngoing });

  return (
    <div className="inline-flex items-center ml-3 text-sm text-gray-500 cursor-pointer hover:bg-gray-200">
      <div className="text-blue-500 pointer-events-none w-4 h-4 mr-1">
        <CalendarIcon />
      </div>
      <div>{moment(fromDate).format('DD/MM/YYYY')}</div>
      <span className="mx-0.5">-</span>
      {isGoing ? (
        <div>Hiện tại</div>
      ) : (
        <div>{moment(toDate).format('DD/MM/YYYY')}</div>
      )}
    </div>
  );
};

export default CvCalendar;
