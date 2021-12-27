import clsx from 'clsx';

const CvSettingIcon = ({
  icon: Icon,
  className,
  title,
  disabled = false,
  style = 'default',
  ...otherProps
}) => {
  return (
    <div
      className={clsx(
        'p-2 flex items-center cursor-pointer',
        { 'cursor-not-allowed': disabled },
        {
          'bg-indigo-500 rounded-l-full px-4': style === 'addItem',
        },
        className
      )}
      title={title}
      {...otherProps}
    >
      <Icon
        className={clsx(
          {
            'text-gray-200 hover:text-white': style === 'addItem',
          },
          'w-5 h-5',
          {
            'hover:text-indigo-500 text-gray-600': style === 'default',
          },
          {
            'opacity-20': disabled,
          }
        )}
      />
    </div>
  );
};

export default CvSettingIcon;
