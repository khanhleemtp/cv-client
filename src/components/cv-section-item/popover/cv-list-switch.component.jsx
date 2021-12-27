import clsx from 'clsx';
import CustomSwitch from '../../CustomSwitch';

const CvListSwitch = ({ list, profile = false }) => {
  return (
    <div
      className={clsx({
        'w-64 px-4 py-2 bg-white shadow-2xl rounded-lg': !profile,
      })}
    >
      {list?.map((item) => (
        <CustomSwitch label={item?.label} name={item?.name} />
      ))}
    </div>
  );
};

export default CvListSwitch;
