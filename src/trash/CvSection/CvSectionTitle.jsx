import { PencilIcon } from '@heroicons/react/solid';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { selectIsCurrentSection } from '../../redux/viewState/viewState.selectors';
import CvTypography from './CvTypography';

const CvSectionTitle = ({ placeholder, name, isSelected }) => {
  return (
    <div
      className={clsx(
        'flex items-center w-full border-b-2 border-gray-300 mb-2',
        { 'rounded-t-lg': isSelected }
      )}
    >
      <PencilIcon className="w-8 h-8 text-blue-500 md:hidden" />
      <CvTypography
        type="h1"
        bold
        color="secondary"
        className="uppercase"
        // className="w-full px-0 uppercase bg-transparent text-2xl text-blue-500 font-semibold border-0 focus:ring-0 placeholder-blue-500 focus:placeholder-blue-300 resize-none"
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  isSelected: selectIsCurrentSection(ownProps.name)(state),
});

export default connect(mapStateToProps)(CvSectionTitle);
