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
import Calendar from '../../Calendar';

const CvSettingItem = ({
  add = () => {},
  remove = () => {},
  calendar = null,
  config = null,
  up = null,
  down = null,
  dayProps = null,
}) => {
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
          setting={<Calendar dayProps={dayProps} />}
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
