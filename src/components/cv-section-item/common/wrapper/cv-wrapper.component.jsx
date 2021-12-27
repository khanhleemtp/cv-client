import { Fragment } from 'react';
import clsx from 'clsx';
import { Transition } from '@headlessui/react';
import { clearBackground } from '../../../../redux/viewState/viewState.action';
import { connect } from 'react-redux';
import {
  selectCurrentSection,
  selectCurrentSectionItem,
} from '../../../../redux/viewState/viewState.selectors';

const CvWrapper = ({
  isSelected,
  children,
  setting,
  container = false,
  isEnabled = true,
}) => {
  return (
    isEnabled && (
      <div
        className={clsx(
          'p-2 bg-transparent relative transition-colors',
          {
            'bg-white ring-0 md:ring-1 ring-blue-500 md:rounded-lg': isSelected,
          },
          {
            'ring-1 rounded-lg': !container && isSelected,
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
});

const mapDispatchToProps = (dispatch) => ({
  clear: () => dispatch(clearBackground()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CvWrapper);
