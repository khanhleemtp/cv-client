import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { useFormContext, useWatch } from 'react-hook-form';
import CustomSwitch from './CustomSwitch';

const PopoverSetting = ({ children }) => {
  const { control, setValue } = useFormContext();

  const photoStyle = useWatch({
    control,
    name: 'photoStyle', // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
    defaultValue: 'rounded', // default value before the render
  });

  return (
    <Popover className="relative">
      <Popover.Button>{children}</Popover.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel className="absolute left-10 -bottom-3 transform -translate-x-full translate-y-full w-72 bg-gray-100 shadow-2xl px-6 py-4 rounded-lg justify-center">
          <CustomSwitch control={control} name="showName" label="Họ tên" />
          <CustomSwitch
            control={control}
            name="showPosition"
            label="Vị trí công việc"
          />
          <CustomSwitch
            control={control}
            name="showPhone"
            label="Số điện thoại"
          />
          <CustomSwitch control={control} name="showEmail" label="Email" />
          <CustomSwitch
            control={control}
            name="showLink"
            label="Website/Link"
          />
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
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default PopoverSetting;
