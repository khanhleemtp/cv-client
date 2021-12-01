import TextareaAutosize from 'react-textarea-autosize';

import {
  PhoneIcon,
  MailIcon,
  LocationMarkerIcon,
  LinkIcon,
} from '@heroicons/react/solid';

import { forwardRef, useCallback } from 'react';

const CvIconInput = forwardRef(({ icon, placeholder = '', ...props }, ref) => {
  const renderIcon = useCallback(() => {
    switch (icon) {
      case 'phone':
        return <PhoneIcon />;
      case 'mail':
        return <MailIcon />;
      case 'location':
        return <LocationMarkerIcon />;
      case 'link':
        return <LinkIcon />;

      default:
        return null;
    }
  }, [icon]);

  return (
    <div className="w-full bg-transparent relative pl-5" ref={ref}>
      {icon && (
        <div className="text-blue-500 pointer-events-none w-4 h-4 absolute top-1/2 transform -translate-y-1/2 left-3">
          {renderIcon()}
        </div>
      )}
      <TextareaAutosize
        maxRows={9999}
        type="text"
        className="w-full bg-transparent text-gray-500 text-xs font-medium border-0 focus:ring-0 placeholder-gray-500 focus:placeholder-gray-300"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
});

export default CvIconInput;
