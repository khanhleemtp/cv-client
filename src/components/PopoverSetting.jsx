import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';

const PopoverSetting = ({
  children,
  setting: SettingComponent,
  position = 'top',
}) => {
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
        <Popover.Panel
          className={clsx(
            'absolute w-72 bg-gray-100 shadow-2xl px-6 py-4 rounded-lg justify-center',
            {
              'left-10 -bottom-3 transform -translate-x-full translate-y-full':
                position === 'bottom',
            },
            {
              'left-8 top-1/2 transform -translate-y-1/2': position === 'top',
            }
          )}
        >
          {SettingComponent && <SettingComponent />}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default PopoverSetting;
