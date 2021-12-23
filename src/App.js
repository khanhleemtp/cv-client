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

const CvListPage = lazy(() =>
  pMinDelay(import('./pages/cv-list/cv-list.page'))
);

const Homepage = lazy(() =>
  pMinDelay(import('./pages/homepage/homepage.component'), 1000)
);

const SignInAndSignUpPage = lazy(() =>
  pMinDelay(import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'))
);

const CvBuilderPage = lazy(() =>
  pMinDelay(import('./pages/cv-builder/cv-builder.component'))
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
          <Route path="/builder/:id">
            <CvBuilderPage />
          </Route>
          <Route path="/preview/:id">
            <CvPreview />
          </Route>
          <PrivateRoute exact path="/list-cv">
            <CvListPage />
          </PrivateRoute>
          <PrivateRoute exact path="/profile">
            <UserProfile />
          </PrivateRoute>
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
          <NotFound text="Không tìm thấy địa chỉ" />
        </Route>
      </Switch>
    </Suspense>
  );
}

export default App;
