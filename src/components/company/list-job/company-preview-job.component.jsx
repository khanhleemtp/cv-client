import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LoadingSmall from './../../loading-small/loading-small.component';
import {
  selectEmployer,
  selectLoadingEmployer,
} from './../../../redux/employer/employer.selectors';
import CompanyOverviewJob from './company-overview-job.component';

const CompanyPreviewJob = ({ employer, loading }) => {
  return loading ? (
    <LoadingSmall />
  ) : !employer?.company ? (
    <div>Bạn chưa có công ty.. vui lòng đăng ký</div>
  ) : employer?.company && employer?.active === false ? (
    <div>Tài khoản của bạn chưa được đồng ý của chủ công ty</div>
  ) : (
    <CompanyOverviewJob />
  );
};

const mapStateToProps = createStructuredSelector({
  employer: selectEmployer,
  loading: selectLoadingEmployer,
});

export default connect(mapStateToProps)(CompanyPreviewJob);
