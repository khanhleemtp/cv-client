import { Popover, Transition } from '@headlessui/react';
import { useState, Fragment, useRef } from 'react';
import { usePopper } from 'react-popper';

const PopoverSetting = ({ children, setting }) => {
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
          offset: [0, 0],
        },
      },
    ],
  });

  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button ref={setReferenceElement}>{children}</Popover.Button>
          <div ref={popperElRef} style={styles.popper} {...attributes.popper}>
            <Transition
              as={Fragment}
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
              beforeEnter={() => setPopperElement(popperElRef.current)}
              afterLeave={() => setPopperElement(null)}
            >
              <Popover.Panel
                static
                className="bg-white shadow-inner m-2 rounded-lg"
              >
                {setting && setting}
              </Popover.Panel>
            </Transition>
          </div>
        </>
      )}
    </Popover>
  );
};

export default PopoverSetting;
