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

const CvListPage = lazy(() =>
  pMinDelay(import('./pages/cv-list/cv-list.page'), 1200)
);

const Homepage = lazy(() =>
  pMinDelay(import('./pages/homepage/homepage.component'), 1200)
);

const SignInAndSignUpPage = lazy(() =>
  pMinDelay(
    import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'),
    1000
  )
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
        <Route path="/builder/:id">
          <CvBuilderPage />
        </Route>
        <Route path="/preview">
          <CvPreview />
        </Route>
        <PrivateRoute exact path="/list-cv">
          <CvListPage />
        </PrivateRoute>
        <PrivateRoute exact path="/profile">
          <UserProfile />
        </PrivateRoute>
        <PublicRoute path="/login">
          <SignInAndSignUpPage />
        </PublicRoute>
        <Route path="/signout">
          <SignOut />
        </Route>
        <Route exact path="/">
          <Homepage />
        </Route>
      </Switch>
    </Suspense>
  );
}

export default App;
