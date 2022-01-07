import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  LockClosedIcon,
  UserIcon,
  OfficeBuildingIcon,
} from '@heroicons/react/solid';
import clsx from 'clsx';

const SettingIcon = ({ icon, text = '', url = '', active = false }) => {
  const Icon = useMemo(() => {
    switch (icon) {
      case 'user':
        return UserIcon;
      case 'company':
        return OfficeBuildingIcon;
      case 'lock':
        return LockClosedIcon;
      default:
        return null;
    }
  }, [icon]);

  return (
    <Link
      className={clsx(
        'flex items-center cursor-pointer hover:text-indigo-500',
        {
          'text-indigo-500': active,
        }
      )}
      to={url}
    >
      <div>
        <Icon className="w-6 h-6 mx-2" />
      </div>
      <div>{text}</div>
    </Link>
  );
};

export default SettingIcon;
