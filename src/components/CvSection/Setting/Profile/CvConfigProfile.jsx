import clsx from 'clsx';
import { useFormContext, useWatch } from 'react-hook-form';
import CustomSwitch from '../../../CustomSwitch';

const CvConfigProfile = () => {
  const { control, setValue } = useFormContext();

  const photoStyle = useWatch({
    control,
    name: 'header.photoStyle', // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
    defaultValue: 'rounded', // default value before the render
  });

  return (
    <div className="p-6 w-64">
      <CustomSwitch control={control} name="header.showName" label="Họ tên" />
      <CustomSwitch
        control={control}
        name="showPosition"
        label="Vị trí công việc"
      />
      <CustomSwitch
        control={control}
        name="header.showPhone"
        label="Số điện thoại"
      />
      <CustomSwitch control={control} name="header.showEmail" label="Email" />
      <CustomSwitch
        control={control}
        name="header.showLink"
        label="Website/Link"
      />
      <CustomSwitch
        control={control}
        name="header.showAddress"
        label="Địa chỉ"
      />

      <div className="flex">
        Photo style
        <div
          className={clsx(
            'w-5 h-5 mx-1 rounded-full bg-gray-500 cursor-pointer',
            {
              'bg-blue-500': photoStyle === 'rounded',
            }
          )}
          onClick={() => setValue('header.photoStyle', 'rounded')}
        ></div>
        <div
          className={clsx('w-5 h-5 mx-1  bg-gray-500 cursor-pointer', {
            'bg-blue-500': photoStyle === 'square',
          })}
          onClick={() => setValue('header.photoStyle', 'square')}
        ></div>
      </div>
    </div>
  );
};

export default CvConfigProfile;
