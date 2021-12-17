import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
const HoverDropdown = ({
  links = [],
  button = 'Dropdown',
  isActive = false,
  isDesktop = false,
}) => {
  return (
    <div
      className={clsx('inline-block relative cursor-pointer', {
        group: isDesktop,
      })}
    >
      <div
        className={clsx(
          'font-semibold py-1 rounded inline-flex items-center group-hover:text-indigo-500',
          { 'text-indigo-500': isActive }
        )}
      >
        <span className="md:px-4 md:py-2 md:rounded-lg py-2 hover:bg-gray-100 inline-flex items-center">
          {button}
        </span>
      </div>
      <ul className="absolute hidden text-gray-600 pt-3 group-hover:block shadow-xl border-1 z-10 rounded-lg">
        {links?.map((link) => (
          <li
            className="flex flex-col bg-white whitespace-no-wrap"
            key={link.name}
          >
            <Link
              className="hover:bg-gray-100 px-2 py-2 flex
                min-w-max hover:text-indigo-500"
              to={link.to}
            >
              <span className="items-center mt-1">
                <link.icon />
              </span>
              <span className="flex-shirk truncate ml-2">{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HoverDropdown;
