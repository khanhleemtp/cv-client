import React from 'react';

const CommonJobInfo = ({ title, icon, info }) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="w-8 h-8 p-2 bg-indigo-100 rounded-full text-indigo-500">
        {icon}
      </div>
      <div>
        <div className="font-medium">{title}</div>
        <div>{info}</div>
      </div>
    </div>
  );
};

export default CommonJobInfo;
