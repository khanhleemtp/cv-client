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
  // signUpFailure,
  // signUpSuccess,
} from './user.action';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    yield put(loadingApi());
    const { data } = yield axiosInstance.post('/users/login', {
      email,
      password,
    });
    yield localStorage.setItem('ldtoken', data?.token);
    yield put(push('/'));
    yield put(checkUserSession());
    yield toast.success('Đăng nhập thành công');
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
    yield put(loadingApi());
    const {
      data: { data },
    } = yield axiosInstance.get('/users/me');
    yield put(signInSuccess(data));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

// START

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onCheckUserSessionStart() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isAuthenticated);
}

export function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onSignOutStart),
    call(onCheckUserSessionStart),
  ]);
}
