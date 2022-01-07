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
  updatePasswordFailure,
  loadingUpdate,
  updatePasswordSuccess,
  updateUserInfoSuccess,
  updateUserInfoFailure,
  // signUpFailure,
  // signUpSuccess,
} from './user.action';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';

export function* getSnapshotUser(message, data, nextRoute = false) {
  yield localStorage.setItem('ldtoken', data?.token);
  yield toast.success(message);
  yield put(checkUserSession(nextRoute));
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    yield put(loadingApi());
    const { data } = yield axiosInstance.post('/users/login', {
      email,
      password,
    });
    yield getSnapshotUser('Đăng nhập thành công', data, true);
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
    yield getSnapshotUser('Đăng ký thành công', data, true);
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

export function nextPage(role) {
  switch (role) {
    case 'admin':
      return '/admin/admin-home';
    case 'employer':
      return '/company/home';
    default:
      return '/list-cv';
  }
}

export function* isAuthenticated({ payload }) {
  try {
    if (!localStorage.getItem('ldtoken')) {
      return;
    }
    yield put(loadingApi());
    const {
      data: { data },
    } = yield axiosInstance.get('/users/me');
    yield put(
      signInSuccess({
        ...data,
      })
    );
    if (payload) {
      yield put(push(nextPage(data?.role)));
    }
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

export function* verifyUser({ payload: { token, role } }) {
  try {
    yield put(loadingVerify());
    yield axiosInstance.get(`/users/verify/${token}`);
    yield toast.success('Xác thực thành công');
    yield put(verifySuccess());
    role === 'user'
      ? yield put(push('/list-cv'))
      : yield put(push('/company/home'));
  } catch (error) {
    yield toast.error(error?.message);
    yield put(verifyFailure(error?.message));
  }
}

export function* requestVerifyUser({ payload }) {
  try {
    yield put(loadingVerify());
    yield axiosInstance.post(`/users/verify`, { email: payload });
    yield toast.success(
      'Đã gửi yêu cầu xác thực, hãy kiểm tra hòm thư của bạn'
    );
    yield put(verifySuccess());
  } catch (error) {
    yield toast.error(error?.message);
    yield put(verifyFailure(error?.message));
  }
}

export function* updatePassword({ payload }) {
  const { password, passwordCurrent } = payload;
  try {
    yield put(loadingUpdate());
    const { data } = yield axiosInstance.patch(`/users/updateMyPassword`, {
      password,
      passwordCurrent,
    });
    yield put(updatePasswordSuccess());

    yield getSnapshotUser('Cập nhật mật khẩu thành công', data);
  } catch (error) {
    yield toast.error(error?.message);
    yield put(updatePasswordFailure(error?.message));
  }
}

export function* updateUserInfo({ payload: { updateData, config = {} } }) {
  try {
    yield put(loadingUpdate());
    const {
      data: { data },
    } = yield axiosInstance.patch(`/users/updateMe`, updateData, config);

    yield put(updateUserInfoSuccess(data));
    yield toast.success('Cập nhật thành công');
  } catch (error) {
    yield toast.error(error?.message);
    yield put(updateUserInfoFailure(error?.message));
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

export function* onUpdatePasswordStart() {
  yield takeLatest(UserActionTypes.UPDATE_PASSWORD_START, updatePassword);
}

export function* onUpdateUserStart() {
  yield takeLatest(UserActionTypes.UPDATE_INFO_START, updateUserInfo);
}

export function* userSagas() {
  yield all([
    call(onUpdateUserStart),
    call(onUpdatePasswordStart),
    call(onEmailSignInStart),
    call(onSignOutStart),
    call(onCheckUserSessionStart),
    call(onSignUpStart),
    call(onVerifyStart),
    call(onRequestVerifyStart),
  ]);
}
