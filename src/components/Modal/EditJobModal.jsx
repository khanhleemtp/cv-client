import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../redux/viewState/viewState.action';
import { ChevronLeftIcon } from '@heroicons/react/solid';
import RoundIcon from '../RoundedIcon';
import { Dialog } from '@headlessui/react';
import EditJobForm from './../company/account-setting/edit-job.component';

const EditJobModal = ({ close, modalRef }) => {
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
        <Dialog.Title className="text-center col-span-3">
          Tạo việc làm
        </Dialog.Title>
        <div className="col-span-1"></div>
      </div>
      <div className="absolute top-14 left-0 h-full w-full flex flex-col bg-white shadow-lg">
        <div className="h-full w-full overflow-y-scroll no-scrollbar pb-28 px-2">
          <EditJobForm />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  close: () => dispatch(closeModal()),
});

export default connect(null, mapDispatchToProps)(EditJobModal);
