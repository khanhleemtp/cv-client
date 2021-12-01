import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';

const PopoverSetting = ({ children, setting, position = 'top' }) => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button>{children}</Popover.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom=" opacity-100"
            leaveTo=" opacity-0"
          >
            <Popover.Panel
              className={clsx(
                'absolute w-72 bg-gray-100 shadow-2xl px-6 py-4 rounded-lg justify-center',
                {
                  'left-0 -bottom-3 transform -translate-x-1/2 translate-y-full':
                    position === 'bottom',
                },
                {
                  '-left-12 -top-1/3 transform -translate-x-1/2 -translate-y-full':
                    position === 'top',
                }
              )}
            >
              {setting && setting}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default PopoverSetting;
