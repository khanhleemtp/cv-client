import useOnClickOutside from './../../hook/useOutsideClick';
import { useRef, useCallback, Fragment } from 'react';
import { useDispatch, connect } from 'react-redux';
import clsx from 'clsx';
import { Transition } from '@headlessui/react';
import {
  selectIsCurrentSection,
  selectTypeModal,
} from '../../redux/viewState/viewState.selectors';
import {
  selectSectionStart,
  selectSectionFinish,
} from './../../redux/viewState/viewState.action';
import { useFormState, useFormContext, useWatch } from 'react-hook-form';
import isEmpty from 'lodash/isEmpty';
import { updateCvStart } from './../../redux/cv/cv.action';

const CvSectionWrapper = ({
  name,
  isSelected,
  children,
  isBorder = false,
  isModalOpen,
  setting,
  container,
}) => {
  const ref = useRef();
  const { control } = useFormContext();

  const cvData = useWatch({
    control,
  });

  const dispatch = useDispatch();
  const { dirtyFields } = useFormState({ control });

  // console.log(
  //   'dirtyField: ',
  //   dirtyFields,
  //   '\n',
  //   'isSlected:',
  //   isSelected,
  //   'dirty',
  //   isDirty
  // );

  const handleClose = useCallback(() => {
    if (isModalOpen) return;
    if (isSelected) {
      if (!isEmpty(dirtyFields)) {
        dispatch(updateCvStart({ updateData: cvData, id: cvData.id }));
      }
      return dispatch(selectSectionFinish());
    }
    return;
  }, [dispatch, isSelected, isModalOpen, cvData, dirtyFields]);

  const handleOpen = (e) => {
    e.stopPropagation();
    if (isSelected) return;
    dispatch(selectSectionStart(name));
  };

  useOnClickOutside(ref, handleClose);

  return (
    <div
      onClick={(e) => handleOpen(e)}
      ref={ref}
      className={clsx(
        'p-2 bg-transparent relative transition-colors',
        {
          'bg-white': isSelected,
        },
        {
          'ring-1 ring-blue-500 rounded-lg': !container && isSelected,
        },
        { 'border-b-2': isBorder }
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
        <div className="absolute z-20 -top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full border-t-2">
          <div className="inline-flex items-center divide-x-2">
            {setting && setting}
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
