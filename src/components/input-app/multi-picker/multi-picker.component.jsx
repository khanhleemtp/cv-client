import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './multi-picker.styles.scss';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/vi';
import { Popover, Transition } from '@headlessui/react';
import Button from './../../button/button.component';
import moment from 'moment';

const MultiPicker = ({ createdAt, date, setDate }) => {
  let numberOfMonths = 2;

  const handleDayClick = (day) => {
    const range = DateUtils.addDayToRange(day, date);
    setDate(range);
  };

  const handleToday = () => {
    setDate({
      to: moment().hour(0).minute(0).second(0).toDate(),
      from: moment().hour(23).minute(59).second(59).toDate(),
    });
  };

  const handleResetClick = () => {
    setDate({
      to: moment().toDate(),
      from: moment().subtract(7, 'd').startOf('day').toDate(),
    });
  };

  const renderFrom = (day) => {
    if (moment(day).isSameOrBefore(createdAt)) return new Date(createdAt);
    return new Date(day);
  };

  console.log(date.from);
  console.log(date.to);

  const handleOptionThree = () => {
    setDate({
      to: moment().toDate(),
      from: renderFrom(moment().subtract(28, 'd').startOf('day').toDate()),
    });
  };

  const handleOptionFour = () => {
    setDate({
      to: moment().toDate(),
      from: moment(createdAt).toDate(),
    });
  };

  const { from, to } = date;
  const modifiers = { start: from, end: to };

  return (
    <div className="RangeExample">
      <Popover className="relative z-20">
        <Popover.Button className="font-sans text-base bg-gray-200 px-2 py-1 rounded-sm">
          {from &&
            to &&
            `${from.toLocaleDateString()} -
                ${to.toLocaleDateString()}`}
        </Popover.Button>
        <Transition
          enter="transform transition duration-100 ease-out"
          enterFrom="scale-95 opacity-0"
          enterTo="scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="scale-100 opacity-100"
          leaveTo="scale-95 opacity-0"
        >
          <Popover.Panel className="absolute z-20 left-4 bg-gray-100 shadow-lg">
            {({ close }) => (
              <div className="flex flex-col md:flex-row md:space-x-2">
                <div className="text-base font-normal ring-1 ring-gray-300">
                  <div
                    className="px-8 py-2 cursor-pointer hover:bg-gray-200"
                    onClick={handleToday}
                  >
                    Hôm nay
                  </div>
                  <div
                    className="px-8 py-2 cursor-pointer hover:bg-gray-200 truncate"
                    onClick={handleResetClick}
                  >
                    7 ngày qua
                  </div>
                  <div
                    className="px-8 py-2 cursor-pointer hover:bg-gray-200 truncate"
                    onClick={handleOptionThree}
                  >
                    28 ngày qua
                  </div>
                  <div
                    className="px-8 py-2 cursor-pointer hover:bg-gray-200 truncate"
                    onClick={handleOptionFour}
                  >
                    Tất cả thời gian
                  </div>
                </div>
                <div className="flex flex-col">
                  <DayPicker
                    locale="vi"
                    className="Selectable flex shadow-none border-0 rounded-none"
                    numberOfMonths={numberOfMonths}
                    selectedDays={[from, { from, to }]}
                    modifiers={modifiers}
                    onDayClick={handleDayClick}
                    localeUtils={MomentLocaleUtils}
                  />
                  <div className="flex justify-end space-x-2 p-2">
                    <Button
                      text="Huỷ"
                      size="small"
                      onClick={() => {
                        handleResetClick();
                        close();
                      }}
                    />
                    <Button
                      text="OK"
                      size="small"
                      onClick={() => {
                        close();
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
};

export default MultiPicker;
