import {
  TrashIcon,
  PlusIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CogIcon,
  DocumentAddIcon,
  DocumentRemoveIcon,
} from '@heroicons/react/outline';
import CvSettingIcon from './CvSettingIcon';
import PopoverSetting from './../../PopoverSetting';
import CvDatepicker from '../CvDatePicker';

// icon, func, display

const CvSettingItem = ({
  add = null,
  remove = null,
  config = null,
  up = null,
  down = null,
  dayProps = null,
  addTag = null,
  removeTag = null,
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
          <div className="hidden md:inline-block truncate">Thêm mới</div>
        </div>
      </div>
      <CvSettingIcon icon={TrashIcon} onClick={remove} title="Xóa" />
      {up && <CvSettingIcon icon={ChevronUpIcon} onClick={up} title="Lên" />}
      {down && (
        <CvSettingIcon icon={ChevronDownIcon} onClick={down} title="Xuống" />
      )}
      {addTag && (
        <CvSettingIcon
          icon={DocumentAddIcon}
          onClick={addTag}
          title="Thêm kỹ năng"
        />
      )}

      {removeTag && (
        <CvSettingIcon
          icon={DocumentRemoveIcon}
          onClick={removeTag}
          title="Xóa kỹ năng"
        />
      )}

      {dayProps && (
        <PopoverSetting
          name={dayProps}
          setting={<CvDatepicker dayProps={dayProps} />}
        >
          <CvSettingIcon icon={CalendarIcon} title="Thời gian" />
        </PopoverSetting>
      )}
      {config && (
        <CvSettingIcon icon={CogIcon} onClick={config} title="Tùy chỉnh" />
      )}
    </>
  );
};

export default CvSettingItem;
