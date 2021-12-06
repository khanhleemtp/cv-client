import clsx from 'clsx';

const CvSettingIcon = ({ icon: Icon, className, title, ...otherProps }) => {
  return (
    <div className={clsx('p-2 flex items-center', className)} title={title}>
      <Icon
        className={'w-5 h-5 cursor-pointer hover:text-indigo-500 text-gray-600'}
        {...otherProps}
      />
    </div>
  );
};

export default CvSettingIcon;
