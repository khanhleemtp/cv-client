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
import CvTemplate from '../CvTemplate';
import CvListSectionPreview from './../CvListSectionPreview';

const SectionCvModal = ({ modalRef, close, title, type }) => {
  const renderChildrenModal = useCallback(() => {
    switch (type) {
      case 'SECTIONS':
        return <CvListSectionPreview />;
      case 'PREVIEW':
        return <CvPreviewFromBuilder />;
      case 'TEMPLATE':
        return <CvTemplate />;
      default:
        return null;
    }
  }, [type]);

  return (
    <div className=" min-h-screen max-h-screen overflow-hidden w-full">
      <div className="grid grid-cols-5 items-center text-lg shadow-inner border-b-2 py-2 px-3">
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
      <div className="absolute top-14 left-0 h-full w-full flex flex-col bg-white shadow-lg">
        <div className="h-full w-full overflow-y-scroll no-scrollbar pb-28 px-2">
          {renderChildrenModal()}
        </div>
      </div>
    </div>
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
