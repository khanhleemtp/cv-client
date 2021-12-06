import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';

const PopoverSetting = ({ children, setting, position = 'top', className }) => {
  return (
    <Popover className={clsx('relative', className)}>
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
                'absolute z-20 w-72 bg-gray-100 shadow-2xl px-6 py-4 rounded-lg justify-center transform',
                {
                  'left-0 -bottom-3 -translate-x-1/2 translate-y-full':
                    position === 'bottom',
                },
                {
                  '-left-12 -top-1/3 -translate-x-1/2 -translate-y-full':
                    position === 'top',
                },
                {
                  '-right-full -top-1/3 -translate-x-1/2 -translate-y-full':
                    position === 'picker',
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
