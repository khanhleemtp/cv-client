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
import { useHistory, useParams } from 'react-router-dom';

const Sidebar = ({ navigationData = [], active = true }) => {
  const { id } = useParams();
  const [currentRoute, setCurrentRoute] = useState(id);
  const history = useHistory();

  const renderIcon = useCallback((element) => {
    switch (element) {
      case 'home':
        return <BsHouseFill />;
      case 'campaign':
        return <BsFillFileBarGraphFill />;
      case 'news':
        return <BsFileEarmarkTextFill />;
      case 'cv':
        return <BsPersonFill />;
      case 'report':
        return <BsBarChartFill />;
      default:
        return null;
    }
  }, []);
  const renderText = useCallback((element) => {
    switch (element) {
      case 'home':
        return 'Bảng tin';
      case 'campaign':
        return 'Chiến dịch ';
      case 'news':
        return 'Tin tuyển dụng';
      case 'cv':
        return 'Quản lý CV';
      case 'report':
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
            onClick={() => {
              setCurrentRoute(element);
              history.push(`/company/${String(element).toLowerCase()}`);
            }}
          >
            <IconContext.Provider value={{ className: 'w-full h-full' }}>
              <div>{renderIcon(element)}</div>
            </IconContext.Provider>

            <div
              className={clsx(
                'text-xs w-0 overflow-hidden ml-2 inline-flex items-center',
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
      </ul>
    </nav>
  );
};

export default Sidebar;
