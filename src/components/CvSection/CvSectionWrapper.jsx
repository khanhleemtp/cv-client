import useOnClickOutside from './../../hook/useOutsideClick';
import { useRef, useCallback } from 'react';
import { useDispatch, connect } from 'react-redux';
import {
  selectedSectionFinish,
  selectedSectionStart,
} from '../../redux/cv/cv.action';
import { selectSectionSelected } from './../../redux/cv/cv.selectors';
import clsx from 'clsx';
import { CameraIcon, CogIcon } from '@heroicons/react/solid';
import { Transition } from '@headlessui/react';

const CvSectionWrapper = ({ name, isSelected, children, isBorder = false }) => {
  const ref = useRef();

  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    if (isSelected) return dispatch(selectedSectionFinish());
    return;
  }, [dispatch, isSelected]);

  const handleOpen = (e) => {
    e.stopPropagation();
    if (isSelected) return;
    dispatch(selectedSectionStart(name));
  };

  useOnClickOutside(ref, handleClose);
  return (
    <div
      onClick={(e) => handleOpen(e)}
      ref={ref}
      className={clsx(
        'mx-2 mb-3 bg-transparent relative',
        {
          'bg-white ring-1 ring-blue-500 rounded-lg': isSelected,
        },
        { 'border-b-2': isBorder }
      )}
    >
      <Transition
        show={isSelected}
        enter="transition ease-in duration-150"
        enterFrom="opacity-0 transform -translate-y-8"
        enterTo="opacity-100"
        leave="ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0 transform -translate-y-8"
      >
        <div className="absolute left-1/2 -top-2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full border-t-2">
          <div className="py-2 px-4 inline-flex items-center text-gray-600">
            <CameraIcon className="w-5 h-5 cursor-pointer hover:text-indigo-500" />
            <span className="mx-1"></span>
            <CogIcon className="w-5 h-5 cursor-pointer hover:text-indigo-500" />
          </div>
        </div>
      </Transition>
      {children}
    </div>
  );
};

const mapDispatchToProps = (state, ownProps) => ({
  isSelected: selectSectionSelected(ownProps.name)(state),
});

export default connect(mapDispatchToProps)(CvSectionWrapper);
