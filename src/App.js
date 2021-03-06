import { Suspense, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkUserSession } from './redux/user/user.action';

import { lazy } from '@loadable/component';
import pMinDelay from 'p-min-delay';

import PublicRoute from './components/common/PublicRoute';
import PrivateRoute from './components/common/PrivateRoute';
import CvPreview from './components/cv-preview/cv-preview.component';
import UserProfile from './pages/user-profile/user-profile.component';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SignOut from './components/sign-out/sign-out.component';
import Loading from './components/loading/loading.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
import NotFound from './components/not-found/not-found.component';
import CompanyDashboard from './pages/company-dashboard/company-dashboard.page';
import VerifyPage from './pages/verify/verify.page';

const SuggestJob = lazy(() =>
  pMinDelay(import('./pages/suggest-job/suggest-job.page'))
);

const JobPage = lazy(() => pMinDelay(import('./pages/job-page/job-page.page')));

const AppliedJobPage = lazy(() =>
  pMinDelay(import('./pages/applied-job/applied-job.page'))
);

const SavedJobPage = lazy(() =>
  pMinDelay(import('./pages/saved-job/saved-job.page'))
);

const CompanyPage = lazy(() =>
  pMinDelay(import('./pages/company-page/company-page.page'))
);

const CvListPage = lazy(() =>
  pMinDelay(import('./pages/cv-list/cv-list.page'))
);

const Homepage = lazy(() =>
  pMinDelay(import('./pages/homepage/homepage.component'))
);

const SignInAndSignUpPage = lazy(() =>
  pMinDelay(import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'))
);

const CvBuilderPage = lazy(() =>
  pMinDelay(import('./pages/cv-builder/cv-builder.component'))
);

const RegisterEmployer = lazy(() =>
  pMinDelay(import('./pages/register-employer/register-employer.page'))
);

const AdminDashboard = lazy(() =>
  pMinDelay(import('./pages/admin-dashboard/admin-dashboard.component'))
);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSession());
    return () => {};
  }, [dispatch]);

  return (
    <Suspense fallback={<Loading />}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Switch>
        <ErrorBoundary>
          <Route path="/builder/:id" component={CvBuilderPage} />
          <Route path="/preview/:id" component={CvPreview} />
          <Route exact path="/verify" component={VerifyPage} />
          <Route exact path="/register-company" component={RegisterEmployer} />
          <Route path="/company-page" component={CompanyPage} />
          <Route path="/job-page" component={JobPage} />

          <PrivateRoute path="/company/:id" component={CompanyDashboard} />
          <PrivateRoute path="/admin/:id" component={AdminDashboard} />
          <PrivateRoute exact path="/list-cv" component={CvListPage} />
          <PrivateRoute exact path="/profile" component={UserProfile} />
          <PrivateRoute exact path="/saved-job" component={SavedJobPage} />
          <PrivateRoute exact path="/apply" component={AppliedJobPage} />
          <PrivateRoute exact path="/suggest-job" component={SuggestJob} />

          <PublicRoute exact path="/login">
            <SignInAndSignUpPage />
          </PublicRoute>
          <Route exact path="/signout">
            <SignOut />
          </Route>
          <Route exact path="/">
            <Homepage />
          </Route>
        </ErrorBoundary>
        <Route path="*">
          <NotFound text="Kh??ng t??m th???y ?????a ch???" />
        </Route>
      </Switch>
    </Suspense>
  );
}

export default App;
