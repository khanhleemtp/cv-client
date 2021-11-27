import React from 'react';
import CvSettingIcon from './CvSettingIcon';
import { TrashIcon, PlusIcon, TemplateIcon } from '@heroicons/react/outline';

const CvSettingTitle = ({ add = () => {}, remove = () => {} }) => {
  return (
    <>
      <div
        className="flex items-center rounded-l-full bg-indigo-500 text-white cursor-pointer hover:bg-indigo-700"
        onClick={add}
        title="Thêm mới"
      >
        <div className="p-2 px-4 flex items-center">
          <div className="flex-grow">
            <PlusIcon className="text-white w-5 h-5" />
          </div>
          <div className="hidden md:inline-block">Thêm mới</div>
        </div>
      </div>
      <CvSettingIcon icon={TrashIcon} onClick={remove} title="Xóa" />
      <CvSettingIcon icon={TemplateIcon} title="Sắp xếp" />
    </>
  );
};

export default CvSettingTitle;
