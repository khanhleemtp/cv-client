import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouteMatch, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import CompanyDetailJob from './company-detail-job.component';
import CompanyListJob from './company-list-job.component';
// import PopoverSetting from './../PopoverSetting';

import { selectLoadingJob } from './../../../redux/job/job.selectors';

import { loadingListJobStart } from '../../../redux/job/job.action';
import { selectCompanyEmployer } from '../../../redux/employer/employer.selectors';

const CompanyOverviewJob = ({ company, loadListJob }) => {
  const { url } = useRouteMatch();

  useEffect(() => {
    loadListJob(`?company=${company?.id}&page=1&limit=4`);
    console.log('run here');
  }, [loadListJob, company]);

  return (
    <div>
      <Route exact path={url} component={CompanyListJob} />
      <Route path={`${url}/:jobId`} component={CompanyDetailJob} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  loadListJob: (query) => dispatch(loadingListJobStart(query)),
});

const mapStateToProps = createStructuredSelector({
  isLoading: selectLoadingJob,
  company: selectCompanyEmployer,
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyOverviewJob);
