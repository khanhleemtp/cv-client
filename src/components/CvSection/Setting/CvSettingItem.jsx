import {
  TrashIcon,
  PlusIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CogIcon,
} from '@heroicons/react/outline';
import CvSettingIcon from './CvSettingIcon';
import PopoverSetting from './../../PopoverSetting';
import CvDatepicker from '../CvDatePicker';

import clsx from 'clsx';
import { useLayoutEffect, useState } from 'react';

const CvSettingItem = ({
  add = null,
  remove = null,
  config = null,
  up = null,
  down = null,
  dayProps = null,
  index = 0,
  isHiddenUp = false,
  isHiddenDown = false,
}) => {
  const [enabledUp, setEnabledUp] = useState(true);
  const [enabledDown, setEnabledDown] = useState(true);

  useLayoutEffect(() => {
    console.log('render layout', isHiddenUp, isHiddenDown);
    if (isHiddenUp) setEnabledUp(false);
    if (isHiddenDown) setEnabledDown(false);
  }, [isHiddenUp, isHiddenDown]);

  return (
    <>
      <div
        className="flex items-center rounded-l-full bg-indigo-500 text-white cursor-pointer hover:bg-indigo-700"
        onClick={add}
        title="Thêm mới"
      >
        <div className="p-2 px-4 flex items-center">
          <div className="flex-grow">
            <PlusIcon className="text-white w-5 h-5" />
          </div>
          <div className="hidden md:inline-block">Thêm mới</div>
        </div>
      </div>
      <CvSettingIcon
        icon={TrashIcon}
        onClick={remove}
        title="Xóa"
        className={clsx({ hidden: remove === null })}
      />
      {enabledUp && (
        <CvSettingIcon icon={ChevronUpIcon} onClick={up} title="Lên" />
      )}
      {enabledDown && (
        <CvSettingIcon icon={ChevronDownIcon} onClick={down} title="Xuống" />
      )}

      <PopoverSetting
        position="bottom"
        setting={<CvDatepicker dayProps={dayProps} />}
        className={clsx({ hidden: dayProps === null })}
      >
        <CvSettingIcon
          icon={CalendarIcon}
          // onClick={calendar}
          title="Thời gian"
        />
      </PopoverSetting>

      <CvSettingIcon
        icon={CogIcon}
        onClick={config}
        title="Tùy chỉnh"
        className={clsx({ hidden: config == null })}
      />
    </>
  );
};

export default CvSettingItem;
