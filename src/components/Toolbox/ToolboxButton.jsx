import clsx from 'clsx';

const ToolboxButton = ({
  rightIcon: RightIcon,
  leftIcon: LeftIcon,
  rightIconClass = '',
  leftIconClass = '',
  bgColorClass = 'bg-gray-200',
  className,
  onClick = () => {},
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'inline-flex text-gray-600 hover:text-indigo-500 rounded-full py-1.5 px-3 items-center mr-2 text-sm',
        bgColorClass,
        className
      )}
    >
      <LeftIcon className="w-6 h-6 pt-1 mr-1" />
      {children}
      <RightIcon className="w-6 h-6 pt-1 ml-1" />
    </button>
  );
};

export default ToolboxButton;
