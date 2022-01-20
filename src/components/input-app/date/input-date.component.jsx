import moment from 'moment';
import { useWatch, useFormContext } from 'react-hook-form';
// import PopoverSetting from '../../PopoverSetting';
import DatePicker from './date-picker.component';
import { Popover, Transition } from '@headlessui/react';

const InputDate = ({ name, label }) => {
  const { control } = useFormContext();
  const date = useWatch({ control, name });

  return (
    <Popover className="relative">
      <Popover.Button>
        <div className="my-2 space-y-2">
          <div>{label}</div>
          <div className="ring-2 py-2 ring-gray-200">
            {moment(date).format('DD/MM/YY')}
          </div>
        </div>{' '}
      </Popover.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="scale-95 opacity-0"
        enterTo="scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="scale-100 opacity-100"
        leaveTo="scale-95 opacity-0"
      >
        <Popover.Panel className="absolute z-20 transform top-0 -translate-y-full translate-x-1/3 bg-gray-100 shadow-lg">
          <DatePicker name={name} />
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default InputDate;
