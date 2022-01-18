import { Route } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import pMinDelay from 'p-min-delay';
import NavContainer from './../../components/nav-container/nav-container.component';
import Loading from './../../components/loading/loading.component';
import BaseModal from '../../components/Modal/BaseModal';

const JobOverview = lazy(() =>
  pMinDelay(
    import('../../components/job-page/job-overview/job-overview.component')
  )
);

const JobDetails = lazy(() =>
  pMinDelay(
    import('../../components/job-page/job-details/job-details.component')
  )
);

const JobPage = ({ match }) => {
  return (
    <Suspense fallback={<Loading />}>
      <NavContainer>
        <BaseModal />
        <Route exact path={`${match.path}`} component={JobOverview} />
        <Route path={`${match.path}/:jobId`} component={JobDetails} />
      </NavContainer>
    </Suspense>
  );
};

export default connect(null)(JobPage);
