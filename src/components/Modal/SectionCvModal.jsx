import RoundIcon from '../RoundedIcon';
import { Dialog } from '@headlessui/react';
import { ChevronLeftIcon } from '@heroicons/react/solid';
import { connect } from 'react-redux';
import { closeModal } from '../../redux/viewState/viewState.action';

const SectionCvModal = ({ modalRef, close }) => {
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
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  close: () => dispatch(closeModal()),
});

export default connect(null, mapDispatchToProps)(SectionCvModal);
