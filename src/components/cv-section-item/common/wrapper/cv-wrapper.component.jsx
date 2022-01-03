import { Fragment } from 'react';
import clsx from 'clsx';
import { Transition } from '@headlessui/react';
import { setFields } from '../../../../redux/viewState/viewState.action';
import { connect } from 'react-redux';
import {
  selectCurrentSection,
  selectCurrentSectionItem,
} from '../../../../redux/viewState/viewState.selectors';

const CvWrapper = ({
  isSelected,
  setWrapper,
  children,
  setting,
  isSelectedContainer,
  container = false,
  isEnabled = true,
  section,
}) => {
  return (
    isEnabled && (
      <div
        onClick={(e) => {
          e.stopPropagation();
          setWrapper();
        }}
        className={clsx(
          'p-2 bg-transparent relative transition-colors',
          {
            'bg-white ring-0 md:ring-1 ring-blue-500 md:rounded-lg': isSelected,
          },
          {
            'ring-1 rounded-lg': !container && isSelected,
          },
          {
            'hover:ring-1':
              (!container && !isSelectedContainer) ||
              (section === 'profile' && !isSelectedContainer),
          }
        )}
      >
        <Transition
          show={isSelected}
          as={Fragment}
          enter="transition"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100 "
          leave="transition"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="absolute z-10 -top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full border-t-2">
            <div className="inline-flex items-center divide-x-2">{setting}</div>
          </div>
        </Transition>
        <div>{children}</div>
      </div>
    )
  );
};

const mapStateToProps = (state, ownProps) => ({
  isSelected: ownProps?.container
    ? selectCurrentSection(ownProps?.section)(state)
    : selectCurrentSectionItem(ownProps?.section, ownProps?.item)(state),
  isSelectedContainer: selectCurrentSection(ownProps?.section)(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setWrapper: () =>
    dispatch(setFields({ section: ownProps?.section, item: ownProps.item })),
});

export default connect(mapStateToProps, mapDispatchToProps)(CvWrapper);
