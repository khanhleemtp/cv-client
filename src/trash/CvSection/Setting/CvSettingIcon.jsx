import clsx from 'clsx';

const CvSettingIcon = ({
  icon: Icon,
  className,
  title,
  disabled = false,
  ...otherProps
}) => {
  return (
    <div
      className={clsx(
        'p-2 flex items-center cursor-pointer',
        { 'cursor-not-allowed': disabled },
        className
      )}
      title={title}
      {...otherProps}
    >
      <Icon
        className={clsx('w-5 h-5 hover:text-indigo-500 text-gray-600', {
          'opacity-20': disabled,
        })}
      />
    </div>
  );
};

export default CvSettingIcon;
