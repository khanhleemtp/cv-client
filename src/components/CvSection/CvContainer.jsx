import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import clsx from 'clsx';
import { selectSelectedSection } from './../../redux/viewState/viewState.selectors';

const CvContainer = ({ children, isSelected }) => {
  // methods.reset(cvData);
  return (
    <div
      className={clsx(
        'bg-transparent container mx-auto transition-colors delay-75 ease-in-out',
        {
          'bg-gray-300 bg-opacity-60': isSelected,
        }
      )}
    >
      {children}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isSelected: selectSelectedSection,
});

export default connect(mapStateToProps)(CvContainer);
