import { Switch, Route } from 'react-router-dom';
import CvEditorPage from './pages/cv-editor/cv-editor.component';
import Homepage from './pages/homepage/homepage.component';
import CvPreview from './components/cv-preview/cv-preview.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import UserProfile from './pages/user-profile/user-profile.component';
import PrivateRoute from './components/common/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PublicRoute from './components/common/PublicRoute';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkUserSession } from './redux/user/user.action';
import SignOut from './components/sign-out/sign-out.component';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSession());
    return () => {};
  }, [dispatch]);

  return (
    <>
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
        <Route path="/cv">
          <CvEditorPage />
        </Route>
        <Route path="/preview">
          <CvPreview />
        </Route>
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
    </>
  );
}

export default App;
