import { useCallback } from 'react';
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
import { CameraIcon } from '@heroicons/react/solid';
import PopoverSetting from './../../PopoverSetting';
import CvSettingIcon from './cv-setting-icon.component';

const CvSettingSectionItem = ({ list }) => {
  const renderIcon = useCallback((icon) => {
    switch (icon) {
      case 'addItem':
        return PlusIcon;
      case 'removeItem':
        return TrashIcon;
      case 'addTag':
        return DocumentAddIcon;
      case 'removeTag':
        return DocumentRemoveIcon;
      case 'up':
        return ChevronUpIcon;
      case 'down':
        return ChevronDownIcon;
      case 'calendar':
        return CalendarIcon;
      case 'config':
        return CogIcon;
      case 'camera':
        return CameraIcon;
      default:
        return null;
    }
  }, []);

  return (
    <div className="flex divide-x-2">
      {list?.map((item) => {
        if (item.icon === 'calendar')
          return (
            <PopoverSetting
              name={item.popover}
              key={item?.icon}
              setting={item.component}
            >
              <CvSettingIcon key={item?.icon} icon={renderIcon(item.icon)} />
            </PopoverSetting>
          );
        if (item.icon === 'config')
          return (
            <PopoverSetting
              name={item.popover}
              key={item?.icon}
              setting={item.component}
            >
              <CvSettingIcon
                key={item?.icon}
                icon={renderIcon(item.icon)}
                disabled={item?.list?.length === 0}
              />
            </PopoverSetting>
          );
        return (
          <CvSettingIcon
            key={item?.icon}
            icon={renderIcon(item.icon)}
            onClick={item?.onClick}
            disabled={item?.onClick === null}
            style={item?.icon}
          />
        );
      })}
    </div>
  );
};

export default CvSettingSectionItem;
