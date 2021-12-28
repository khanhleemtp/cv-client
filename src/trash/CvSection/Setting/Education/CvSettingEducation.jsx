import { useCallback } from 'react';
// import { connect } from 'react-redux';

import {
  TrashIcon,
  PlusIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/outline';
import CvSettingIcon from '../CvSettingIcon';

const CvSettingEducation = ({ list }) => {
  const renderIcon = useCallback((icon) => {
    switch (icon) {
      case 'addItem':
        return PlusIcon;
      case 'removeItem':
        return TrashIcon;
      case 'up':
        return ChevronUpIcon;
      case 'down':
        return ChevronDownIcon;
      default:
        return null;
    }
  }, []);

  return list?.map((item) => (
    <CvSettingIcon
      key={item?.icon}
      icon={renderIcon(item.icon)}
      onClick={item?.onClick}
      disabled={item?.onClick === null}
    />
  ));
};

export default CvSettingEducation;
