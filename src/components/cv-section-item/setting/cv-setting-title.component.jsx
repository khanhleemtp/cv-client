import React from 'react';

import { TrashIcon, PlusIcon, TemplateIcon } from '@heroicons/react/outline';
import CvSettingIcon from './cv-setting-icon.component';

const CvSettingTitle = ({
  add = () => {},
  remove = () => {},
  dragCvModal = () => {},
}) => {
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
          <div className="hidden md:inline-block truncate">Thêm mới</div>
        </div>
      </div>
      <CvSettingIcon icon={TrashIcon} onClick={remove} title="Xóa" />
      <CvSettingIcon
        icon={TemplateIcon}
        title="Sắp xếp"
        onClick={dragCvModal}
      />
    </>
  );
};

export default CvSettingTitle;
