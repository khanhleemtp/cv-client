import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';
import { useState } from 'react';
import CustomDatepicker from './../CustomDatepicker';
import CustomSwitch from '../CustomSwitch';

const CvDatepicker = ({ dayProps }) => {
  const { control, setValue } = useFormContext();

  const cbIsOngoing = () => setValue(`${dayProps}.to`, null);
  const cbTo = () => setValue(`${dayProps}.isOngoing`, false);

  const [isFrom, setIsFrom] = useState(true);
  return (
    <>
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

      {isFrom ? (
        <div className="w-full flex items-center justify-center">
          <CustomDatepicker name={`${dayProps}.from`} />
        </div>
      ) : (
        <div>
          <div className="w-32">
            <CustomSwitch
              label="Hiện tại"
              control={control}
              name={`${dayProps}.isOngoing`}
              cb={cbIsOngoing}
            />
          </div>
          <CustomDatepicker
            name={`${dayProps}.to`}
            isOngoing={`${dayProps}.isOngoing`}
            cb={cbTo}
          />
        </div>
      )}
    </>
  );
};

export default CvDatepicker;
