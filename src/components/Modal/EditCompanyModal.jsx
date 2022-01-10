import React from 'react';
import CompanyEditForm from '../company/account-setting/company-edit-form.component';
import { createStructuredSelector } from 'reselect';
import { selectCompanyInOtherPropsModal } from '../../redux/viewState/viewState.selectors';
import { connect } from 'react-redux';
import { closeModal } from '../../redux/viewState/viewState.action';
import { ChevronLeftIcon } from '@heroicons/react/solid';
import RoundIcon from './../RoundedIcon';

const EditCompanyModal = ({ company, close, modalRef }) => {
  return (
    <div className="bg-white p-8 rounded-lg my-4" ref={modalRef}>
      <div className="col-span-1">
        <RoundIcon
          icon={ChevronLeftIcon}
          bgColorClass="bg-indigo-100"
          iconColorClass="text-indigo-500"
          onClick={close}
        />
      </div>
      <CompanyEditForm company={company} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  company: selectCompanyInOtherPropsModal,
});

const mapDispatchToProps = (dispatch) => ({
  close: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCompanyModal);
