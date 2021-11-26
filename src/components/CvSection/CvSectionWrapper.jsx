import useOnClickOutside from './../../hook/useOutsideClick';
import { useRef, useCallback } from 'react';
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
  setting: SettingComponent,
}) => {
  const ref = useRef();

  const { control } = useFormContext();

  const cvData = useWatch({
    control,
  });

  const { dirtyFields } = useFormState({ control });
  // console.log('isDirty', isDirty, dirtyFields, cvData);

  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    if (isModalOpen) return;
    if (isSelected) {
      if (!isEmpty(dirtyFields)) {
        dispatch(updateCvStart({ updateData: cvData, id: cvData.id }));
      }
      return dispatch(selectSectionFinish());
    }
    return;
  }, [dispatch, isSelected, isModalOpen, dirtyFields, cvData]);

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
          <div className="inline-flex items-center">
            {SettingComponent && <SettingComponent />}
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
