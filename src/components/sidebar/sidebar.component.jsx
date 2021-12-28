import React, { useState, useCallback } from 'react';
import {
  BsHouseFill,
  BsFillFileBarGraphFill,
  BsFileEarmarkTextFill,
  BsPersonFill,
  BsBarChartFill,
} from 'react-icons/bs';
import { IconContext } from 'react-icons';
import styles from './sidebar.module.css';
import clsx from 'clsx';

const Sidebar = ({ navigationData, active }) => {
  const [currentRoute, setCurrentRoute] = useState('Home');

  const renderIcon = useCallback((element) => {
    switch (element) {
      case 'Home':
        return <BsHouseFill />;
      case 'Gallery':
        return <BsFillFileBarGraphFill />;
      case 'Store':
        return <BsFileEarmarkTextFill />;
      case 'Favorites':
        return <BsPersonFill />;
      case 'Saved':
        return <BsBarChartFill />;
      default:
        return null;
    }
  }, []);
  const renderText = useCallback((element) => {
    switch (element) {
      case 'Home':
        return 'Bảng tin';
      case 'Gallery':
        return 'Chiến dịch ';
      case 'Store':
        return 'Tin tuyển dụng';
      case 'Favorites':
        return 'Quản lý CV';
      case 'Saved':
        return 'Báo cáo tuyển dụng';
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
                'justify-start px-4': active,
              },
              'group-hover:justify-start group-hover:px-4',
            ])}
            onClick={() => setCurrentRoute(element)}
          >
            <IconContext.Provider value={{ className: 'w-full h-full' }}>
              <div>{renderIcon(element)}</div>
            </IconContext.Provider>

            <div
              className={clsx(
                'text-xs w-0 overflow-hidden ml-2 inline-flex items-center',
                'group-hover:w-auto',
                {
                  'w-auto': active,
                }
              )}
            >
              {renderText(element)}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
