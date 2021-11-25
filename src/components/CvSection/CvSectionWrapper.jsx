import useOnClickOutside from './../../hook/useOutsideClick';
import { useRef, useCallback } from 'react';
import { useDispatch, connect } from 'react-redux';
import clsx from 'clsx';
import { CameraIcon, CogIcon } from '@heroicons/react/solid';
import { Transition } from '@headlessui/react';
import PopoverSetting from './../PopoverSetting';
// import ModalFullScreen from './../ModalFullScreen';
import {
  selectIsCurrentSection,
  selectTypeModal,
} from '../../redux/viewState/viewState.selectors';
import {
  selectSectionStart,
  selectSectionFinish,
  openModal,
} from './../../redux/viewState/viewState.action';

const CvSectionWrapper = ({
  name,
  isSelected,
  children,
  isBorder = false,
  isModalOpen,
}) => {
  const ref = useRef();

  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    if (isModalOpen) return;
    if (isSelected) return dispatch(selectSectionFinish());
    return;
  }, [dispatch, isSelected, isModalOpen]);

  const handleOpen = (e) => {
    e.stopPropagation();
    if (isSelected) return;
    dispatch(selectSectionStart(name));
  };

  const handleOpenModal = () => dispatch(openModal('UPLOAD_IMAGE'));

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
        enterFrom="opacity-0 transform -translate-y-2"
        enterTo="opacity-100"
        leave="ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0 transform -translate-y-2"
      >
        <div className="absolute z-20 left-1/2 -top-2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full border-t-2">
          <div className="py-2 px-4 inline-flex items-center text-gray-600">
            <CameraIcon
              className="w-5 h-5 cursor-pointer hover:text-indigo-500"
              onClick={handleOpenModal}
            />
            <span className="mx-1"></span>
            <PopoverSetting>
              <CogIcon className="w-5 h-5 mt-1 cursor-pointer hover:text-indigo-500" />
            </PopoverSetting>
          </div>
        </div>
      </Transition>
      {children}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  isSelected: selectIsCurrentSection(ownProps.name)(state),
  isModalOpen: selectTypeModal(state),
});

export default connect(mapStateToProps)(CvSectionWrapper);
