import clsx from 'clsx';
import { useFormContext, useWatch } from 'react-hook-form';
import CustomSwitch from '../../../CustomSwitch';

const CvConfigProfile = () => {
  const { control, setValue } = useFormContext();

  const photoStyle = useWatch({
    control,
    name: 'photoStyle', // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
    defaultValue: 'rounded', // default value before the render
  });

  return (
    <>
      <CustomSwitch control={control} name="showName" label="Họ tên" />
      <CustomSwitch
        control={control}
        name="showPosition"
        label="Vị trí công việc"
      />
      <CustomSwitch control={control} name="showPhone" label="Số điện thoại" />
      <CustomSwitch control={control} name="showEmail" label="Email" />
      <CustomSwitch control={control} name="showLink" label="Website/Link" />
      <CustomSwitch control={control} name="showAddress" label="Địa chỉ" />

      <div className="flex">
        Photo style
        <div
          className={clsx(
            'w-5 h-5 mx-1 rounded-full bg-gray-500 cursor-pointer',
            {
              'bg-blue-500': photoStyle === 'rounded',
            }
          )}
          onClick={() => setValue('photoStyle', 'rounded')}
        ></div>
        <div
          className={clsx('w-5 h-5 mx-1  bg-gray-500 cursor-pointer', {
            'bg-blue-500': photoStyle === 'square',
          })}
          onClick={() => setValue('photoStyle', 'square')}
        ></div>
      </div>
    </>
  );
};

export default CvConfigProfile;
