import { useRef, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import UploadModal from './Modal/UploadModal';
import LDModal from './Modal/LDModal';

const MODAL_COMPONENTS = {
  UPLOAD_IMAGE: <UploadModal />,
  LD: <LDModal />,
};

const StateModal = ({ isOpen = false, setIsOpen, modalType }) => {
  const closeModal = () => setIsOpen(false);
  let closeButtonRef = useRef(null);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        onClose={closeModal}
        initialFocus={closeButtonRef}
        open={isOpen}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        <Transition.Child as={Fragment}>
          <Dialog.Overlay className="fixed inset-0 opacity-60 bg-gray-300" />
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

          <aside className="relative flex items-center justify-center">
            <div
              className="w-full h-48 bg-black text-white flex items-center justify-center"
              ref={closeButtonRef}
            >
              {MODAL_COMPONENTS[modalType]}
              Content
            </div>
          </aside>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default StateModal;
