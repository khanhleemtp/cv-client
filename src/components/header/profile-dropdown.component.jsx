import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { BellIcon } from '@heroicons/react/solid';
import { UserIcon } from '@heroicons/react/solid';
import clsx from 'clsx';

const ProfileDropdown = ({ user, userNavigation }) => {
  return (
    <>
      <button
        type="button"
        className="bg-gray-100 p-1 rounded-full text-indigo-500 hover:text-white hover:bg-indigo-500 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-indigo-500 focus:ring-white"
      >
        {/* TODO Nav after LOGIN */}
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-6 w-6 " aria-hidden="true" />
      </button>

      {/* TODO Profile dropdown */}
      <Menu as="div" className="ml-3 relative">
        <div>
          <Menu.Button className="bg-gray-100 inline-flex items-center px-2 text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-white">
            {user?.imageUrl ? (
              <img
                className="h-8 w-8 rounded-full"
                src={user?.imageUrl}
                alt="avatar"
              />
            ) : (
              <UserIcon className="w-8 h-8 rounded-full" />
            )}
            {user?.name}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            {userNavigation.map((item) => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <Link
                    to={item.to}
                    className={clsx('block px-4 py-2 text-sm text-gray-700', {
                      'bg-gray-100': active,
                    })}
                  >
                    {item.name}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default ProfileDropdown;
