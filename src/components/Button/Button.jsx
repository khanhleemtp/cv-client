import clsx from 'clsx';
import React from 'react';

const Button = ({
  size = 'normal',
  type = 'primary',
  text = '',
  full = false,
  icon: Icon,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  margin = false,
  onClick = () => {},
  ...otherProps
}) => {
  return (
    <button
      onClick={onClick}
      {...otherProps}
      className={clsx(
        'align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none rounded-lg',
        {
          'text-white bg-indigo-500 border border-transparent active:bg-indigo-500 hover:bg-indigo-600 focus:shadow-outline-indigo':
            type === 'primary',
        },
        {
          'text-gray-600 border-gray-300 border dark:text-gray-400 focus:outline-none active:bg-transparent hover:border-indigo-500 focus:border-indigo-600 active:text-indigo-600 focus:shadow-outline-indigo hover:text-indigo-500 focus:text-indigo-600':
            type === 'outline',
        },
        {
          'text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:shadow-outline-gray dark:hover:bg-gray-500 dark:hover:text-gray-300 hover:text-indigo-500':
            type === 'link',
        },
        {
          ' px-4 py-2 text-base': size === 'normal' && text,
        },
        {
          'px-2 py-1 text-sm': size === 'small' && text,
        },
        {
          'px-6 py-4 text-lg': size === 'large' && text,
        },
        {
          'w-full': full,
        },
        {
          'py-2 px-2': Icon,
        },
        {
          'mx-2': margin,
        }
      )}
    >
      {LeftIcon && <LeftIcon className="h-5 w-5 mr-2 -ml-1" />}
      {text}
      {Icon && <Icon className="w-5 h-5" />}
      {RightIcon && <RightIcon className="w-5 h-5 ml-2 -mr-1" />}
    </button>
  );
};

export default Button;
