import Sidebar from './../../components/sidebar/sidebar.component';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import clsx from 'clsx';
import LogoApp from './../logo/logo.component';

const HeaderForBusiness = ({ children }) => {
  const [active, setActive] = useState(false);
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
          <div className="ml-16 inline-flex items-center text-white">
            <LogoApp />
            <span className="ml-2">for Business</span>
          </div>
        </div>
        <Sidebar
          active={active}
          navigationData={['Home', 'Gallery', 'Store', 'Favorites', 'Saved']}
        />
      </div>
      <div
        className={clsx('m-20 transition-all', {
          'ml-52': active,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default HeaderForBusiness;
