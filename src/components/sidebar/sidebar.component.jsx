import React, { useState, useCallback } from 'react';
import {
  BsHouseFill,
  BsFillFileBarGraphFill,
  BsFileEarmarkTextFill,
  BsPersonFill,
  BsBarChartFill,
} from 'react-icons/bs';

import { AiFillSetting, AiOutlineLogout } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import styles from './sidebar.module.css';
import clsx from 'clsx';
import { useHistory, useParams } from 'react-router-dom';
import { signOutStart } from './../../redux/user/user.action';
import { connect } from 'react-redux';

const Sidebar = ({ navigationData = [], active = true, baseRoute, logout }) => {
  const { id } = useParams();
  const [currentRoute, setCurrentRoute] = useState(id);
  const history = useHistory();

  const renderIcon = useCallback((element) => {
    switch (element) {
      case 'home':
      case 'admin-home':
        return <BsHouseFill />;
      case 'admin-user':
      case 'campaign':
        return <BsFillFileBarGraphFill />;
      case 'news':
        return <BsFileEarmarkTextFill />;
      case 'cv':
        return <BsPersonFill />;
      case 'report':
        return <BsBarChartFill />;
      case 'setting':
        return <AiFillSetting />;
      default:
        return null;
    }
  }, []);
  const renderText = useCallback((element) => {
    switch (element) {
      case 'home':
      case 'admin-home':
        return 'Bảng tin';
      case 'admin-user':
        return 'Quản lý công ty';
      case 'campaign':
        return 'Chiến dịch ';
      case 'news':
        return 'Tin tuyển dụng';
      case 'cv':
        return 'Quản lý CV';
      case 'report':
        return 'Báo cáo tuyển dụng';
      case 'setting':
        return 'Cài đặt tài khoản';
      default:
        return null;
    }
  }, []);

  return (
    <nav
      className={clsx(
        styles.wrapper,
        'group',
        {
          'w-48': active,
        },
        'hover:w-48'
      )}
    >
      <ul className={styles.navListItems}>
        {navigationData.map((element, index) => (
          <li
            key={index}
            className={clsx([
              styles.navItem,
              currentRoute === element && styles.navItemActive,
              {
                'justify-center': !active,
              },
              {
                'space-x-2 justify-start': active,
              },
              'group-hover:space-x-2 group-hover:justify-start px-4',
            ])}
            onClick={() => {
              setCurrentRoute(element);
              history.push(`/${baseRoute}/${String(element).toLowerCase()}`);
            }}
          >
            <IconContext.Provider
              value={{ className: 'w-full h-full flex-grow' }}
            >
              <div>{renderIcon(element)}</div>
            </IconContext.Provider>

            <div
              className={clsx(
                'w-0 text-sm overflow-hidden inline-flex items-center',
                'group-hover:w-auto truncate',
                {
                  'w-auto truncate': active,
                }
              )}
            >
              {renderText(element)}
            </div>
          </li>
        ))}
        <li
          className="cursor-pointer flex justify-center items-center"
          onClick={logout}
          title="Đăng xuất"
        >
          <IconContext.Provider
            value={{ className: 'w-5 h-5 my-2 text-red-400' }}
          >
            <AiOutlineLogout />
          </IconContext.Provider>
        </li>
      </ul>
    </nav>
  );
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(signOutStart()),
});

export default connect(null, mapDispatchToProps)(Sidebar);
