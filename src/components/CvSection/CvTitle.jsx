import React from 'react';
import { PencilIcon } from '@heroicons/react/solid';

const CvTitle = ({ onClick }) => {
  return (
    <div className="flex items-center p-2" onClick={onClick}>
      <PencilIcon className="w-6 h-6 mr-1 pt-1" />
      LD CV
    </div>
  );
};

export default CvTitle;