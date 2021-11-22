/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { useLocation } from 'react-router-dom';
import HoverDropdown from '../hover-dropdown/hover-dropdown.component';
import LogoApp from './../logo/logo.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { navigation, userNavigation } from './header.data';
import ProfileDropdown from './profile-dropdown.component';
import ButtonBeforeLogin from './button-before-login.component';
import ProfileSeparate from './profile-seperate.component';

function Navbar({ user }) {
  const location = useLocation();
  return (
    <Disclosure
      as="nav"
      className="bg-white shadow-xl fixed top-0 left-0 h-16 right-0 z-50 text-gray-600"
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* TODO Mobile Menu Button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* TODO core nav */}
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <LogoApp />
                <div className="hidden sm:flex sm:ml-6 item-center">
                  <div className="flex space-x-4 items-center">
                    {navigation.map((item) => (
                      <HoverDropdown
                        key={item.name}
                        button={item.name}
                        links={item.child}
                        isActive={location.pathname === item.to}
                        isDesktop={true}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {/* TODO conditional nav */}
              <div className="hidden absolute inset-y-0 right-0 sm:flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {!user ? (
                  <div className="hidden md:flex items-center">
                    <ButtonBeforeLogin />
                  </div>
                ) : (
                  <ProfileDropdown
                    user={user}
                    userNavigation={userNavigation}
                  />
                )}
              </div>
            </div>
          </div>

          {/* TODO Nav Mobile */}
          <Disclosure.Panel className="sm:hidden">
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              {/* TODO Core Nav Mobile */}
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-xl">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    className={clsx(
                      'block group px-3 py-2 rounded-md text-base font-medium w-full hover:bg-gray-100',
                      { 'bg-gray-100': location.pathname === item.to }
                    )}
                    aria-current={
                      location.pathname === item.to ? 'page' : undefined
                    }
                  >
                    <HoverDropdown
                      button={item.name}
                      links={item.child}
                      key={item.name}
                      isActive={location.pathname === item.to}
                    />
                  </Disclosure.Button>
                ))}

                {/* TODO Conditonal Nav Mobile */}
                <div className="pt-4 pb-3 border-t border-gray-700">
                  {user ? (
                    <ProfileSeparate
                      user={user}
                      userNavigation={userNavigation}
                    />
                  ) : (
                    <div className="flex flex-col items-center px-5">
                      <ButtonBeforeLogin />
                    </div>
                  )}
                </div>
              </div>
            </Transition>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

export default connect(mapStateToProps)(Navbar);
