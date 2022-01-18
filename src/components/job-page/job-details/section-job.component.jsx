import React from 'react';

const SectionJob = ({ title, children }) => {
  return (
    <div className="col-span-6 md:col-span-4 bg-white p-6 space-y-4">
      <div className="divide-x-4 flex divide-indigo-400">
        <div className=""></div>
        <div className="pl-3 text-xl">{title}</div>
      </div>
      {children}
    </div>
  );
};

export default SectionJob;
