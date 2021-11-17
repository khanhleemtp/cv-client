import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
const HoverDropdown = ({
  links = [],
  button = 'Dropdown',
  isActive = false,
}) => {
  return (
    <div className="group inline-block relative cursor-pointer">
      <div
        className={clsx(
          'font-semibold md:py-3 md:px-4 rounded inline-flex items-center group-hover:text-indigo-500',
          { 'text-indigo-500': isActive }
        )}
      >
        <span className="mr-1 inline-flex items-center">{button}</span>
      </div>
      <ul className="absolute hidden text-gray-600 pt-3 group-hover:block shadow-xl border-1 z-10 rounded-lg">
        {links?.map((link) => (
          <li
            className="flex flex-col bg-white whitespace-no-wrap"
            key={link.name}
          >
            <Link
              className="hover:bg-gray-100 py-3 px-6 inline-flex items-center
                min-w-max hover:text-indigo-500"
              to={link.to}
            >
              <span className="items-center mt-1 mr-2">
                <link.icon />
              </span>
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HoverDropdown;
