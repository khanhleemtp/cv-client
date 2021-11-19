import { Disclosure } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { BellIcon } from '@heroicons/react/solid';
import { UserIcon } from '@heroicons/react/solid';

const ProfileSeparate = ({ user, userNavigation }) => {
  return (
    <div className="flex flex-col items-center px-5">
      <div className="flex w-full justify-center">
        <div className="bg-gray-100 inline-flex items-center px-2 text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-white">
          {user && user?.imageUrl ? (
            <img
              className="h-8 w-8 rounded-full"
              src={user?.imageUrl || ''}
              alt="avatar"
            />
          ) : (
            <UserIcon className="w-8 h-8 rounded-full" />
          )}
          {user?.name}
        </div>
        <span className="mx-1"></span>
        <button
          type="button"
          className="bg-gray-100 p-1 rounded-full text-indigo-500 hover:text-white hover:bg-indigo-500 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-indigo-500 focus:ring-white"
        >
          <BellIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-3 px-2 space-y-1 w-full">
        {userNavigation.map((item) => (
          <Disclosure.Button
            key={item.name}
            as={Link}
            to={item.to}
            className="flex items-center justify-center px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 hover:text-indigo-500"
          >
            {item.name}
          </Disclosure.Button>
        ))}
      </div>
    </div>
  );
};

export default ProfileSeparate;
