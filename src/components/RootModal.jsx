import UploadModal from './Modal/UploadModal';
import UserUploadImage from './Modal/UserUploadImage';

import { useRef, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectIsOpenModal,
  selectTypeModal,
} from '../redux/viewState/viewState.selectors';
import { closeModal } from '../redux/viewState/viewState.action';
import SectionCvModal from './Modal/SectionCvModal';
import { selectIsFullModal } from './../redux/viewState/viewState.selectors';

const MODAL_COMPONENTS = (modalRef) => ({
  UPLOAD_IMAGE: <UploadModal modalRef={modalRef} />,
  SECTION_CV: <SectionCvModal modalRef={modalRef} />,
  USER_UPLOAD_IMAGE: <UserUploadImage modalRef={modalRef} />,
});

const RootModal = ({ typeModal, close, isOpen, isFull }) => {
  let closeButtonRef = useRef(null);
  return (
    <div>
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          onClose={close}
          initialFocus={closeButtonRef}
          className="fixed z-50 inset-0 overflow-y-auto"
          open={isOpen}
        >
          <div className="min-h-screen w-full flex items-center justify-center">
            {!isFull && (
              <Transition.Child as={Fragment}>
                <Dialog.Overlay className="fixed inset-0 opacity-60 bg-gray-900" />
              </Transition.Child>
            )}
            {isFull && (
              <Transition.Child as={Fragment}>
                <Dialog.Overlay className="hidden md:block md:fixed inset-0" />
              </Transition.Child>
            )}
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-150"
              enterFrom="opacity-0 transform -translate-x-20"
              enterTo="opacity-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0 transform -translate-x-20"
            >
              {isFull ? (
                <aside className="fixed inset-y-0 z-40 flex-shrink-0 w-screen bg-white shadow-lg md:max-w-sm md:inset-0">
                  {typeModal
                    ? MODAL_COMPONENTS(closeButtonRef)[typeModal]
                    : null}
                </aside>
              ) : (
                <aside className="relative flex items-center justify-center w-full max-w-lg">
                  {typeModal
                    ? MODAL_COMPONENTS(closeButtonRef)[typeModal]
                    : null}
                </aside>
              )}
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isOpen: selectIsOpenModal,
  typeModal: selectTypeModal,
  isFull: selectIsFullModal,
});

const mapDispatchToProps = (dispatch) => ({
  close: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RootModal);
