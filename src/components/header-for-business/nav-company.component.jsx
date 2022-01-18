import React from 'react';
import { PencilAltIcon, LinkIcon } from '@heroicons/react/outline';
import Button from './../button/button.component';
import { openModal } from '../../redux/viewState/viewState.action';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { selectEmployer } from './../../redux/employer/employer.selectors';

const NavCompany = ({ createJob, employer }) =>
  employer?.active ? (
    <div className="flex space-x-2">
      <Button
        text="Đăng tin"
        size="small"
        className="rounded-full text-base"
        leftIcon={PencilAltIcon}
        onClick={createJob}
      />
      {/* <Button
        text="Tìm cv"
        size="small"
        leftIcon={SearchIcon}
        className="rounded-full text-base px-4"
      /> */}
      {employer?.company && (
        <Link to={`/company-page/${employer?.company?.id}`}>
          <Button
            text="CompanyPage"
            size="small"
            leftIcon={LinkIcon}
            className="rounded-full text-base px-4"
          />
        </Link>
      )}
    </div>
  ) : null;

const mapDispatchToProps = (dispatch) => ({
  createJob: () => dispatch(openModal('CREATE_JOB', {})),
});

const mapStateToProps = createStructuredSelector({
  employer: selectEmployer,
});

export default connect(mapStateToProps, mapDispatchToProps)(NavCompany);
