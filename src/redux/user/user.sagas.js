import { takeLatest, put, call, all } from 'redux-saga/effects';
import { UserActionTypes } from './user.types';
import axiosInstance from './../../api/axiosConfig';
import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  loadingApi,
  checkUserSession,
  loadingVerify,
  verifyFailure,
  verifySuccess,
  // signUpFailure,
  // signUpSuccess,
} from './user.action';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';

export function* getSnapshotUser(message, data) {
  yield localStorage.setItem('ldtoken', data?.token);
  yield toast.success(message);
  yield put(push('/'));
  yield put(checkUserSession());
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    yield put(loadingApi());
    const { data } = yield axiosInstance.post('/users/login', {
      email,
      password,
    });
    yield getSnapshotUser('Đăng nhập thành công', data);
  } catch (error) {
    yield put(signInFailure(error.message));
    yield toast.error(error.message);
  }
}

export function* signUp({ payload: { email, password, name } }) {
  try {
    yield put(loadingApi());
    const { data } = yield axiosInstance.post('/users/signup', {
      email,
      password,
      name,
    });
    yield getSnapshotUser('Đăng ký thành công', data);
  } catch (error) {
    yield put(signInFailure(error.message));
    yield toast.error(error.message);
  }
}

export function* signOut() {
  try {
    yield localStorage.clear();
    yield put(signOutSuccess());
    yield put(push('/login'));
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* isAuthenticated() {
  try {
    if (!localStorage.getItem('ldtoken')) {
      // yield put(push('/login'));
      return;
    }
    yield put(loadingApi());
    const {
      data: { data },
    } = yield axiosInstance.get('/users/me');
    // const resumesData = yield axiosInstance.get(`/resumes`);
    yield put(
      signInSuccess({
        ...data,
        // resumes: resumesData?.data?.data,
      })
    );
  } catch (error) {
    yield put(signInFailure(error.message));
    // yield put(push('/login'));
  }
}

export function* verifyUser({ payload: { token, role } }) {
  try {
    yield put(loadingVerify());
    yield axiosInstance.get(`/users/verify/${token}`);
    yield toast.success('Xác thực thành công');
    yield push(verifySuccess());
    role === 'user'
      ? yield put(push('/list-cv'))
      : yield put(push('/company/home'));
  } catch (error) {
    yield toast.error(error?.message);
    yield put(verifyFailure(error?.message));
  }
}

export function* requestVerifyUser({ payload }) {
  console.log('payload', payload);
  try {
    yield put(loadingVerify());
    yield axiosInstance.post(`/users/verify`, { email: payload });
    yield toast.success(
      'Đã gửi yêu cầu xác thực, hãy kiểm tra hòm thư của bạn'
    );
    yield push(verifySuccess());
  } catch (error) {
    yield toast.error(error?.message);
    yield put(verifyFailure(error?.message));
  }
}

// START

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onCheckUserSessionStart() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isAuthenticated);
}

export function* onVerifyStart() {
  yield takeLatest(UserActionTypes.VERIFY_START, verifyUser);
}

export function* onRequestVerifyStart() {
  yield takeLatest(UserActionTypes.REQUEST_VERIFY_START, requestVerifyUser);
}

export function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onSignOutStart),
    call(onCheckUserSessionStart),
    call(onSignUpStart),
    call(onVerifyStart),
    call(onRequestVerifyStart),
  ]);
}
