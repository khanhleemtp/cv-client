import { selectBackground } from '../../redux/cv/cv.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import clsx from 'clsx';

const CvContainer = ({ children, isSelected }) => {
  return (
    <div
      className={clsx('relative bg-transparent mx-auto', {
        'bg-gray-300 bg-opacity-60': isSelected,
      })}
    >
      {children}
    </div>
  );
};

const mapDispatchToProps = createStructuredSelector({
  isSelected: selectBackground,
});

export default connect(mapDispatchToProps)(CvContainer);
