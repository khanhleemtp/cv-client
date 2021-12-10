import React from 'react';
import clsx from 'clsx';

function RoundIcon({
  icon: Icon,
  iconColorClass = 'text-white',
  bgColorClass = 'bg-green-500',
  className,
  onClick = () => {},
  ...otherProps
}) {
  return (
    <div
      className={clsx(
        'p-1.5 rounded-full mr-2 inline-flex hover:bg-opacity-80 cursor-pointer',
        iconColorClass,
        bgColorClass,
        className
      )}
      onClick={onClick}
      {...otherProps}
    >
      <Icon className="w-5 h-5" />
    </div>
  );
}

export default RoundIcon;
