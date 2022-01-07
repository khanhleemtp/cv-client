import { useMemo } from 'react';
import {
  DocumentTextIcon,
  DocumentReportIcon,
  FlagIcon,
  DocumentAddIcon,
} from '@heroicons/react/outline';

const CvCard = ({ title = '', icon = '', count = 0, bg = '0', ...props }) => {
  const Icon = useMemo(() => {
    switch (icon) {
      case 'flag':
        return FlagIcon;
      case 'report':
        return DocumentReportIcon;
      case 'add':
        return DocumentAddIcon;
      case 'text':
        return DocumentTextIcon;
      default:
        return null;
    }
  }, [icon]);

  const bgColor = useMemo(() => {
    switch (bg) {
      case '1':
        return 'from-green-200 to-green-400 ring-green-400 hover:ring-green-600';
      case '2':
        return 'from-red-100 to-red-400 ring-red-400 hover:ring-red-600';
      case '3':
        return 'from-indigo-200 to-blue-400 ring-blue-400 hover:ring-blue-600';
      case '4':
        return 'from-pink-200 to-pink-400 ring-pink-400 hover:ring-pink-600';
      default:
        return 'from-gray-200 to-gray-400 ring-gray-400 hover:ring-gray-600';
    }
  }, [bg]);

  return (
    <div
      {...props}
      className={`flex relative group p-4 cursor-pointer items-center justify-between bg-gradient-to-b w-full max-w-xs rounded-lg ${bgColor} ring-1 ring-offset-2`}
    >
      <div className="flex flex-col items-between justify-center overflow-ellipsis">
        <div className="mb-2">{count}</div>
        <div>{title}</div>
      </div>
      {Icon && (
        <div className="p-2 rounded-full bg-gradient-to-b from-transparent to-white text-gray-800">
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};

export default CvCard;
