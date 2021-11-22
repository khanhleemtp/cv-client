import React from 'react';
import { PencilIcon } from '@heroicons/react/solid';

const CvSectionTitle = ({ placeholder }) => {
  return (
    <div className="flex items-center w-full">
      <PencilIcon className="w-8 h-8 pt-1 text-blue-500" />
      <input
        type="text"
        className="w-full uppercase bg-transparent text-2xl text-blue-500 font-semibold border-0 focus:ring-0 placeholder-blue-500 focus:placeholder-blue-300"
        placeholder={placeholder}
      />
    </div>
  );
};

export default CvSectionTitle;
