import Sidebar from './../../components/sidebar/sidebar.component';
import {
  MenuIcon,
  XIcon,
  SearchIcon,
  PencilAltIcon,
} from '@heroicons/react/outline';
import { useState } from 'react';
import clsx from 'clsx';
import LogoApp from './../logo/logo.component';
import Button from './../button/button.component';

const HeaderForBusiness = ({
  children,
  title,
  navigationData,
  admin = false,
}) => {
  const [active, setActive] = useState(true);
  const handleToggle = () => {
    setActive(!active);
  };
  return (
    <div>
      <div className="bg-white shadow-xl fixed top-0 left-0 h-16 right-0 z-30 text-gray-600">
        <div className="relative flex items-center justify-between h-16 bg-gray-800">
          <div className="absolute inset-y-0 left-0 flex items-center">
            {/* TODO Mobile Menu Button*/}
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={handleToggle}
            >
              {active ? (
                <XIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          <div className="ml-16 flex flex-1 justify-between items-center text-white">
            <div className="inline-flex">
              <LogoApp />
              <span className="ml-2">
                {admin ? 'for Admin' : 'for Business'}
              </span>
            </div>
            <div className="flex items-center">
              <Button
                text="Đăng tin"
                size="small"
                className="rounded-full text-base px-4"
                leftIcon={PencilAltIcon}
              />
              <Button
                text="Tìm cv"
                size="small"
                leftIcon={SearchIcon}
                className="rounded-full mx-2 text-base px-4"
              />
            </div>
            <div className="w-1/2"></div>
          </div>
        </div>
        <Sidebar active={active} navigationData={navigationData} />
      </div>
      <div
        className={clsx('mt-16 ml-16 transition-all', {
          'ml-48': active,
        })}
      >
        <div className="flex-1 w-full h-14 p-4 bg-white shadow-lg flex font-medium text-lg">
          {title}
        </div>
        <div className="mt-4 ml-4">{children}</div>
      </div>
    </div>
  );
};

export default HeaderForBusiness;
