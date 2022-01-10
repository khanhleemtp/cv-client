import { Route } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import pMinDelay from 'p-min-delay';
import NavContainer from './../../components/nav-container/nav-container.component';
import Loading from './../../components/loading/loading.component';

const CompanyOverview = lazy(() =>
  pMinDelay(
    import(
      '../../components/company-page/company-overview/company-overview.component'
    )
  )
);

const CompanyDetails = lazy(() =>
  pMinDelay(
    import(
      '../../components/company-page/company-details/company-details.component'
    )
  )
);

const CompanyPage = ({ match }) => {
  return (
    <Suspense fallback={<Loading />}>
      <NavContainer>
        <Route exact path={`${match.path}`} component={CompanyOverview} />
        <Route path={`${match.path}/:companyId`} component={CompanyDetails} />
      </NavContainer>
    </Suspense>
  );
};

export default connect(null)(CompanyPage);
