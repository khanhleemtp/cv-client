import useOnClickOutside from '../../hook/useOutsideClick';
import { useRef, useCallback, Fragment, memo } from 'react';
import { useDispatch, connect } from 'react-redux';
import clsx from 'clsx';
import { Transition } from '@headlessui/react';
import {
  selectIsCurrentSection,
  selectSelectedPopover,
  selectTypeModal,
} from '../../redux/viewState/viewState.selectors';
import {
  selectSectionStart,
  selectSectionFinish,
  closePopover,
} from '../../redux/viewState/viewState.action';
// import { useFormState, useFormContext, useWatch } from 'react-hook-form';
// import { updateCvStart } from './../../redux/cv/cv.action';

const CvSectionWrapper = ({
  name,
  isSelected,
  children,
  isBorder = false,
  isModalOpen,
  setting,
  container,
  popover,
}) => {
  const ref = useRef();
  // const { control } = useFormContext();

  // const cvData = useWatch({
  //   control,
  // });

  const dispatch = useDispatch();
  // const { dirtyFields } = useFormState({ control });

  const handleClose = useCallback(() => {
    if (isModalOpen) return;
    if (isSelected) {
      // if (!isEmpty(dirtyFields)) {
      //   dispatch(updateCvStart({ updateData: cvData, id: cvData.id }));
      // }
      return dispatch(selectSectionFinish());
    }
    return;
  }, [dispatch, isSelected, isModalOpen]);

  const handleOpen = (e) => {
    e.stopPropagation();
    if (isSelected) {
      return;
    }
    dispatch(selectSectionStart(name));
  };

  const closeP = () => {
    if (!popover) return;
    dispatch(closePopover());
  };

  useOnClickOutside(ref, handleClose);

  return (
    <div
      onClick={(e) => handleOpen(e)}
      ref={ref}
      className={clsx(
        'p-2 bg-transparent relative transition-colors',
        { 'border-b-2': isBorder },
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
      <div onClick={closeP}>{children}</div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  isSelected: selectIsCurrentSection(ownProps.name)(state),
  isModalOpen: selectTypeModal(state),
  popover: selectSelectedPopover(state),
});

export default connect(mapStateToProps)(memo(CvSectionWrapper));
