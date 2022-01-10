import React from 'react';

const CompanyCard = () => {
  return (
    <div className="animate-pulse">
      <div className="my-6 space-y-2 w-full md:max-w-xs h-28 shadow-2xl ring-2 ring-gray-200 rounded-sm p-4">
        <div className="flex items-start space-x-4">
          <div className="h-10 w-10 gradient-purple-pink-red rounded-full"></div>
          <div className="flex-grow space-y-2">
            <div class="h-4 gradient-purple-pink-red rounded-full w-5/6"></div>
            <div class="h-4 gradient-purple-pink-red rounded-full w-4/6"></div>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="h-4 gradient-purple-pink-red rounded-full w-5/12"></div>
          <div className="h-4 gradient-purple-pink-red rounded-full w-2/6"></div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
