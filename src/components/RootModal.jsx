import UploadModal from './Modal/UploadModal';
import { useRef, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectIsOpenModal,
  selectTypeModal,
} from '../redux/viewState/viewState.selectors';
import { closeModal } from '../redux/viewState/viewState.action';

const MODAL_COMPONENTS = (modalRef) => ({
  UPLOAD_IMAGE: <UploadModal modalRef={modalRef} />,
});

const RootModal = ({ typeModal, close, isOpen }) => {
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
            <Transition.Child as={Fragment}>
              <Dialog.Overlay className="fixed inset-0 opacity-60 bg-gray-900" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-150"
              enterFrom="opacity-0 transform -translate-x-20"
              enterTo="opacity-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0 transform -translate-x-20"
            >
              {/* <aside className="fixed inset-y-0 z-50 flex-shrink-0 w-screen overflow-y-auto bg-white shadow-lg dark:bg-gray-800 lg:hidden">
            <div className="grid grid-cols-5 items-center text-lg shadow-xl py-2 px-3">
              <div className="col-span-1">
                <RoundIcon
                  icon={ChevronLeftIcon}
                  bgColorClass="bg-indigo-100"
                  iconColorClass="text-indigo-500"
                  ref={closeButtonRef}
                  onClick={closeSidebar}
                />
              </div>
              <Dialog.Title className="text-center col-span-3">
                Hello World
              </Dialog.Title>
              <div className="col-span-1"></div>
            </div>
            <div className="p-2">
              <div>abc</div>
              <div>abc</div>
              <div>abc</div>
            </div>
          </aside> */}

              <aside className="relative flex items-center justify-center w-full max-w-lg">
                <div
                  className="bg-white mx-2 shadow-lg rounded-lg w-full"
                  // ref={closeButtonRef}
                >
                  {typeModal
                    ? MODAL_COMPONENTS(closeButtonRef)[typeModal]
                    : null}
                </div>
              </aside>
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
});

const mapDispatchToProps = (dispatch) => ({
  close: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RootModal);
