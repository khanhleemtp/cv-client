/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { BellIcon } from '@heroicons/react/solid';
import { useLocation } from 'react-router-dom';
import HoverDropdown from '../hover-dropdown/hover-dropdown.component';
import LogoApp from './../logo/logo.component';
import {
  AiOutlineRobot,
  AiOutlinePushpin,
  AiOutlineSearch,
  AiOutlineFileMarkdown,
  AiOutlineHeart,
  AiOutlineMedicineBox,
  AiOutlineReconciliation,
  AiOutlineRise,
} from 'react-icons/ai';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { UserIcon } from '@heroicons/react/solid';
const navigation = [
  {
    name: 'Việc làm',
    to: '/',
    child: [
      {
        name: 'Tìm việc làm',
        to: '/job',
        icon: AiOutlineSearch,
      },
      {
        name: 'Việc làm đã ứng tuyển',
        to: '/',
        icon: AiOutlineHeart,
      },
      {
        name: 'Việc làm đã lưu',
        to: '/',
        icon: AiOutlinePushpin,
      },
      {
        name: 'Việc làm phù hợp',
        to: '/',
        icon: AiOutlineRobot,
      },
    ],
  },
  {
    name: 'Quản lý CV',
    to: '/cv',
    child: [
      {
        name: 'Builder',
        to: '/cv',
        icon: AiOutlineMedicineBox,
      },
      {
        name: 'Mẫu CV',
        to: '/preview',
        icon: AiOutlineFileMarkdown,
      },
    ],
  },
  {
    name: 'Công ty',
    to: 'company',
    child: [
      {
        name: 'Danh sách công ty',
        to: '/cv',
        icon: AiOutlineReconciliation,
      },
      {
        name: 'Top công ty',
        to: '/',
        icon: AiOutlineRise,
      },
    ],
  },
];

const userNavigation = [
  { name: 'Thông tin', to: '/profile' },
  { name: 'Cài đặt', to: '/' },
  { name: 'Đăng xuất', to: '/signout' },
];

// const user = {
//   name: 'LD Khánh',
//   email: 'khanhleemtp@gmail.com',
//   imageUrl:
//     'https://scontent.fhan5-4.fna.fbcdn.net/v/t1.6435-9/176015030_2887694994803741_8199308757039107225_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=cV6-WBadmpkAX_Mr8Rd&_nc_ht=scontent.fhan5-4.fna&oh=61eb71f3eadc720cb4f56e16208d743d&oe=61A052ED',
// };

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Navbar({ user, logout }) {
  const location = useLocation();
  console.log('userNav', user);
  return (
    <Disclosure
      as="nav"
      className="bg-white shadow-xl fixed top-0 left-0 h-16 right-0 z-10 text-gray-600"
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
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
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden absolute inset-y-0 right-0 sm:flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {!user ? (
                  <div className="hidden md:flex items-center">
                    <Link
                      as="button"
                      to="/login"
                      className="px-4 py-2 rounded-md mx-2 font-semibold bg-indigo-500 text-white hover:bg-indigo-700"
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      as="button"
                      to="/register-company"
                      className="px-4 py-2 ring-offset-indigo-500 rounded-md mx-2 font-semibold text-gray-600 hover:text-indigo-700 bg-gray-100 ring-1 ring-offset-1"
                    >
                      Đăng tuyển & tìm hồ sơ
                    </Link>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      className="bg-gray-100 p-1 rounded-full text-indigo-500 hover:text-white hover:bg-indigo-500 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-indigo-500 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6 " aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
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
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
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
                )}
              </div>
            </div>
          </div>

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
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-xl">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    className={classNames(
                      location.pathname === item.to
                        ? 'bg-gray-100'
                        : 'hover:bg-gray-100',
                      'block px-3 py-2 rounded-md text-base font-medium w-full'
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

                <div className="pt-4 pb-3 border-t border-gray-700">
                  {user ? (
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
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
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none">
                          {user?.name}
                        </div>
                        <div className="text-sm font-medium leading-none text-gray-400">
                          {user?.email}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="ml-auto bg-gray-100 p-1 rounded-full text-indigo-500 hover:text-white hover:bg-indigo-500 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-indigo-500 focus:ring-white"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                      <div className="mt-3 px-2 space-y-1">
                        {userNavigation.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as={Link}
                            to={item.to}
                            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 hover:text-indigo-500"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center px-5">
                      <Link
                        as="button"
                        to="/login"
                        className="px-4 py-2 mb-2 rounded-md mx-2 font-semibold bg-indigo-500 text-white hover:bg-indigo-700"
                      >
                        Đăng nhập
                      </Link>
                      <Link
                        as="button"
                        to="/register-company"
                        className="px-4 py-2 ring-offset-indigo-500 rounded-md mx-2 font-semibold text-gray-600 hover:text-indigo-700 bg-gray-100 ring-1 ring-offset-1"
                      >
                        Đăng tuyển & tìm hồ sơ
                      </Link>
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
