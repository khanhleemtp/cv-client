import { useCallback } from 'react';
import { Dialog } from '@headlessui/react';
import { ChevronLeftIcon } from '@heroicons/react/solid';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import RoundIcon from '../RoundedIcon';
import { closeModal } from '../../redux/viewState/viewState.action';
import {
  selectTypeInOtherPropsModal,
  selectTitleInOtherPropsModal,
} from './../../redux/viewState/viewState.selectors';
import CvPreviewFromBuilder from './../cv-preview/cv-preview-from-builder';

const SectionCvModal = ({ modalRef, close, title, type }) => {
  const renderChildrenModal = useCallback(() => {
    switch (type) {
      case 'SECTIONS':
        return (
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum
            illo est architecto asperiores, error molestiae ipsum, quam saepe
            mollitia beatae explicabo. Eum laborum pariatur architecto, facilis
            quos eos ab eius!
          </div>
        );
      case 'PREVIEW':
        return <CvPreviewFromBuilder />;
      default:
        return null;
    }
  }, [type]);

  return (
    <>
      <div className="grid grid-cols-5 items-center text-lg shadow-xl py-2 px-3">
        <div className="col-span-1" ref={modalRef}>
          <RoundIcon
            icon={ChevronLeftIcon}
            bgColorClass="bg-indigo-100"
            iconColorClass="text-indigo-500"
            onClick={close}
          />
        </div>
        <Dialog.Title className="text-center col-span-3">{title}</Dialog.Title>
        <div className="col-span-1"></div>
      </div>
      <div className="p-2">{renderChildrenModal()}</div>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  type: selectTypeInOtherPropsModal,
  title: selectTitleInOtherPropsModal,
});

const mapDispatchToProps = (dispatch) => ({
  close: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionCvModal);
