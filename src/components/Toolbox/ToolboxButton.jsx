import clsx from 'clsx';

const ToolboxButton = ({
  rightIcon: RightIcon,
  leftIcon: LeftIcon,
  bgColorClass = 'bg-gray-200',
  className,
  onClick = () => {},
  children,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'inline-flex text-gray-600 hover:text-indigo-500 rounded-full py-1.5 px-2 items-center mr-2 text-sm',
        bgColorClass,
        className
      )}
    >
      <LeftIcon className="w-5 h-5 pt-1 mr-1" />
      <p className="truncate">{children}</p>
      <RightIcon className="w-5 h-5 pt-1 ml-1" />
    </button>
  );
};

export default ToolboxButton;
