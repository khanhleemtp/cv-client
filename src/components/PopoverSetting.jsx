import { Popover, Transition } from '@headlessui/react';
import { useState, Fragment, useRef } from 'react';
import { usePopper } from 'react-popper';
import { selectIsCurrentPopover } from './../redux/viewState/viewState.selectors';
import { connect } from 'react-redux';
import {
  setFields,
  clearBackground,
} from './../redux/viewState/viewState.action';

const PopoverSetting = ({ children, setting, open, close, isOpen }) => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const popperElRef = useRef(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom',
    modifiers: [
      {
        name: 'preventOverflow',
        options: {
          boundary: 'clippingParents',
        },
      },
      {
        name: 'flip',
        options: {
          allowedAutoPlacements: ['bottom-end'],
          fallbackPlacements: ['bottom-end', 'top'],
          altBoundary: true,
        },
      },
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  return (
    <Popover>
      <Popover.Button ref={setReferenceElement}>
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            isOpen ? close() : open();
          }}
        >
          {children}
        </div>
      </Popover.Button>

      <div
        ref={popperElRef}
        style={styles.popper}
        {...attributes.popper}
        className="relative z-10"
      >
        <Transition
          as={Fragment}
          show={isOpen}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          beforeEnter={() => {
            setPopperElement(popperElRef.current);
          }}
          afterLeave={() => {
            setPopperElement(null);
          }}
        >
          <Popover.Panel
            static={isOpen}
            className="bg-white shadow-inner rounded-lg"
          >
            {setting && setting}
          </Popover.Panel>
        </Transition>
      </div>
    </Popover>
  );
};

const mapStateToProps = (state, ownProps) => ({
  isOpen: selectIsCurrentPopover(ownProps?.name)(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  open: () => dispatch(setFields({ popover: ownProps?.name })),
  close: () => dispatch(clearBackground()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PopoverSetting);
