import React from 'react';
import { Popover, Transition } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/solid';
import { createStructuredSelector } from 'reselect';
import { selectNotifications } from '../../redux/user/user.selectors';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { viewNoti } from './../../redux/user/user.action';
const Notification = ({
  notifications,
  color = 'text-indigo-500',
  viewNotification,
}) => {
  return (
    <Popover className="relative">
      <Popover.Button className={`${color} relative`}>
        <div className="absolute inset-x-5 -inset-y-1 text-indigo-800 font-medium text-xs w-4 h-4 flex items-center justify-center rounded-full bg-white">
          {notifications?.filter((item) => item.view === false)?.length}
        </div>
        <BellIcon className="w-6 h-6 z-10" onClick={viewNotification} />
      </Popover.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="scale-100 opacity-100"
        leaveTo="scale-95 opacity-0"
      >
        <Popover.Panel className="absolute z-50 transform -translate-x-full">
          <ul className="h-64 w-72 max-w-xs bg-white shadow-lg  overflow-y-auto ring-1 ring-gray-300 rounded-lg">
            {notifications?.map((noti) => (
              <Link key={noti._id} to={noti?.link}>
                <li className="hover:bg-gray-200 px-4 inline-flex space-x-1 py-2">
                  <div className="w-4 h-4 my-1 rounded-full bg-red-200"></div>
                  <div className="flex-1">{noti?.message}</div>
                </li>
              </Link>
            ))}
          </ul>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

const mapStateToProps = createStructuredSelector({
  notifications: selectNotifications,
});

const mapDispatchToProps = (dispatch) => ({
  viewNotification: () => dispatch(viewNoti()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
