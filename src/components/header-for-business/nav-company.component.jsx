import React from 'react';
import { SearchIcon, PencilAltIcon } from '@heroicons/react/outline';
import Button from './../button/button.component';

const NavCompany = () => (
  <div className="flex space-x-2">
    <Button
      text="Đăng tin"
      size="small"
      className="rounded-full text-base"
      leftIcon={PencilAltIcon}
    />
    <Button
      text="Tìm cv"
      size="small"
      leftIcon={SearchIcon}
      className="rounded-full text-base px-4"
    />
  </div>
);

export default NavCompany;
