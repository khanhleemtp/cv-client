import Sidebar from './../../components/sidebar/sidebar.component';
import { MenuIcon } from '@heroicons/react/outline';
import { useState, useMemo } from 'react';
import clsx from 'clsx';
import LogoApp from './../logo/logo.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './../../redux/user/user.selectors';
import NavCompany from './nav-company.component';
import { navAdminData, navCompanyData } from './headerBusiness.data';
import { signOutStart } from './../../redux/user/user.action';
import Notification from './../notification/notification.component';

const HeaderForBusiness = ({ children, title, user }) => {
  const [active, setActive] = useState(false);
  const handleToggle = () => {
    setActive(!active);
  };

  const navigationData = useMemo(() => {
    switch (user?.role) {
      case 'admin':
        return navAdminData;
      default:
        return navCompanyData;
    }
  }, [user]);

  const baseRoute = useMemo(() => {
    switch (user?.role) {
      case 'admin':
        return 'admin';
      default:
        return 'company';
    }
  }, [user]);

  return (
    <div>
      <div className="bg-white shadow-xl fixed top-0 left-0 h-16 right-0 z-30 text-white-400">
        <div className="relative flex items-center justify-around h-16 bg-gradient-to-r from-gray-800 to-indigo-300">
          <div className="absolute inset-y-0 left-0 flex items-center">
            {/* TODO Mobile Menu Button*/}
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={handleToggle}
            >
              <MenuIcon className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="ml-16 flex md:flex-1 justify-between items-center text-white overflow-x-auto overflow-y-hidden">
            <div className="inline-flex">
              <LogoApp />
              <span className="ml-2">
                {user?.role === 'admin' ? 'for Admin' : 'for Business'}
              </span>
            </div>
            {user?.verify && user?.role === 'employer' && <NavCompany />}
            <div className="w-1/2"></div>
          </div>
          <div className="flex-1">
            <Notification color="text-white" />
          </div>
        </div>
        <Sidebar
          active={active}
          navigationData={navigationData}
          baseRoute={baseRoute}
        />
      </div>
      <div
        className={clsx('mt-16 ml-16 transition-all', {
          'md:ml-48': active,
        })}
      >
        <div className="flex-1 w-full h-14 p-4 bg-white shadow-lg flex font-medium text-lg">
          {title}
        </div>
        <div className="mx-auto container p-2">{children}</div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderForBusiness);
