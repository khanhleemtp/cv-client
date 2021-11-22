import { selectBackground } from '../../redux/cv/cv.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import clsx from 'clsx';

const CvContainer = ({ children, isSelected }) => {
  return (
    <div className="relative mx-auto">
      <div
        className={clsx({
          'absolute inset-0 bg-gray-300 opacity-60 z-10': isSelected,
        })}
      ></div>
      {children}
    </div>
  );
};

const mapDispatchToProps = createStructuredSelector({
  isSelected: selectBackground,
});

export default connect(mapDispatchToProps)(CvContainer);
