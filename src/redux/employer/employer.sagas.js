import { takeLatest, put, call, all } from 'redux-saga/effects';
import { EmployerActionTypes } from './employer.types';
import axiosInstance from './../../api/axiosConfig';
import { toast } from 'react-toastify';
import {
  loadingEmployer,
  loadingRegister,
  loadingEmployerSuccess,
  loadingEmployerFailure,
  updateEmployerSuccess,
  updateEmployerFailure,
  updatingEmployer,
  registerEmployerSuccess,
} from './employer.action';

// import { getSnapshotUser } from '../user/user.sagas';
import { getSnapshotUser } from '../user/user.sagas';

export function* registerEmployer({ payload }) {
  try {
    yield put(loadingRegister());
    const { data } = yield axiosInstance.post(`/employers`, payload);
    yield put(registerEmployerSuccess());
    yield getSnapshotUser('Đăng ký thành công', data, true);
  } catch (error) {
    yield toast.error(error?.message);
    yield put(loadingEmployerFailure(error?.message));
  }
}

export function* loadEmployer({ payload }) {
  try {
    yield put(loadingEmployer());
    const {
      data: { data },
    } = yield axiosInstance.get(`/employers/${payload}`);

    yield put(loadingEmployerSuccess(data));
  } catch (error) {
    yield toast.error(error?.message);
    yield put(loadingEmployerFailure(error?.message));
  }
}

export function* updateEmployer({ payload: { id, updateData } }) {
  try {
    yield put(updatingEmployer());
    const {
      data: { data },
    } = yield axiosInstance.patch(`/employers/${id}`, updateData);
    yield put(updateEmployerSuccess(data));
    yield toast.success('Cập nhật thành công');
  } catch (error) {
    yield toast.error(error?.message);
    yield put(updateEmployerFailure(error?.message));
  }
}

// START
export function* onRegisterEmployerStart() {
  yield takeLatest(
    EmployerActionTypes.REGISTER_EMPLOYER_START,
    registerEmployer
  );
}

export function* onLoadEmployerStart() {
  yield takeLatest(EmployerActionTypes.LOAD_EMPLOYER_START, loadEmployer);
}

export function* onUpdateEmployerStart() {
  yield takeLatest(EmployerActionTypes.UPDATE_EMPLOYER_START, updateEmployer);
}

export function* employerSagas() {
  yield all([
    call(onRegisterEmployerStart),
    call(onLoadEmployerStart),
    call(onUpdateEmployerStart),
  ]);
}
