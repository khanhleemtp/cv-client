import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';
import { useState } from 'react';
import CustomDatepicker from './../CustomDatepicker';
import CustomSwitch from '../CustomSwitch';
// import { updateCvStart } from '../../redux/cv/cv.action';
import { connect } from 'react-redux';
import { updateCvStart } from './../../redux/cv/cv.action';

const CvDatepicker = ({ dayProps, updateCv }) => {
  const { setValue } = useFormContext();

  // const dispatch = useDispatch();
  // const { isDirty } = useFormState({ control, name: dayProps });

  const { getValues } = useFormContext();

  // useEffect(() => {
  //   if (isDirty) {
  //     const cvData = getValues();
  //     dispatch(updateCvStart({ updateData: cvData, id: cvData.id }));
  //   }
  // }, [isDirty, getValues, dispatch]);

  const updateData = () => {
    const cvData = getValues();
    updateCv({ updateData: cvData, id: cvData.id });
  };

  const cbIsOngoing = () => {
    setValue(`${dayProps}.to`, null);
    updateData();
  };
  const cbTo = () => {
    setValue(`${dayProps}.isOngoing`, false);
    updateData();
  };

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
          <CustomDatepicker name={`${dayProps}.from`} updateData={updateData} />
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <CustomSwitch
            label="Hiện tại"
            name={`${dayProps}.isOngoing`}
            cb={cbIsOngoing}
          />
          <CustomDatepicker
            name={`${dayProps}.to`}
            isOngoing={`${dayProps}.isOngoing`}
            cb={cbTo}
            updateData={updateData}
          />
        </div>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateCv: (data) => dispatch(updateCvStart(data)),
});

export default connect(null, mapDispatchToProps)(CvDatepicker);
