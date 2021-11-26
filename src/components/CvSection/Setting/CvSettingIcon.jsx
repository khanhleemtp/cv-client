import clsx from 'clsx';

const CvSettingIcon = ({ icon: Icon, className, title, ...otherProps }) => {
  return (
    <div className="p-2 flex items-center" title={title}>
      <Icon
        className={clsx(
          className,
          'w-5 h-5 cursor-pointer hover:text-indigo-500 text-gray-600'
        )}
        {...otherProps}
      />
    </div>
  );
};

export default CvSettingIcon;
