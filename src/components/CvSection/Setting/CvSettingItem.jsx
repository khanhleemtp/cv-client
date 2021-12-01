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

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import 'moment/locale/vi';
import MomentLocaleUtils from 'react-day-picker/moment';
import CustomSwitch from './../../CustomSwitch';
import { useFormContext } from 'react-hook-form';

const CvSettingItem = ({
  add = () => {},
  remove = () => {},
  calendar = null,
  config = null,
  up = null,
  down = null,
}) => {
  const { control } = useFormContext();
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
      {remove && (
        <CvSettingIcon icon={TrashIcon} onClick={remove} title="Xóa" />
      )}
      {up && <CvSettingIcon icon={ChevronUpIcon} onClick={up} title="Lên" />}
      {down && (
        <CvSettingIcon icon={ChevronDownIcon} onClick={down} title="Xuống" />
      )}
      {calendar && (
        <PopoverSetting
          position="top"
          setting={
            <div>
              <div className="flex divide-opacity-20 items-center justify-around">
                <div className="bg-gray-400 p-2 flex-1 text-center cursor-pointer">
                  Từ
                </div>
                <div className="bg-gray-200 p-2 flex-1 text-center cursor-pointer">
                  Đến
                </div>
              </div>
              <div className="w-32">
                <CustomSwitch label="Hiện tại" control={control} />
              </div>
              <DayPicker localeUtils={MomentLocaleUtils} locale="vi" />
            </div>
          }
        >
          <CvSettingIcon
            icon={CalendarIcon}
            onClick={calendar}
            title="Thời gian"
          />
        </PopoverSetting>
      )}
      {config && (
        <CvSettingIcon icon={CogIcon} onClick={config} title="Tùy chỉnh" />
      )}
    </>
  );
};

export default CvSettingItem;
