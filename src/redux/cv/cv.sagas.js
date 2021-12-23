import { takeLatest, put, call, all } from 'redux-saga/effects';
// import { push } from 'connected-react-router';
// import { toast } from 'react-toastify';
import axiosInstance from './../../api/axiosConfig';
import { CvActionTypes } from './cv.types';
import { toast } from 'react-toastify';
import { CV_DATAS } from './cv.datas';

import {
  loadingApi,
  loadCvFinish,
  loadCvFailure,
  loadListCvFinish,
  loadListCvFailure,
  updateCvFinish,
  updateCvFailure,
  loadingUpdate,
  deleteCvFailure,
  deleteCvFinish,
  createCvFinish,
} from './cv.action';

export function* onLoadCvAsync({ payload: id }) {
  try {
    yield put(loadingApi());
    const { data } = yield axiosInstance.get(`/resumes/${id}`);
    yield put(loadCvFinish(data?.data));
  } catch (error) {
    yield toast.error(error.message);
    yield put(loadCvFailure(error));
  }
}

export function* onDeleteCvAsync({ payload: id }) {
  try {
    yield put(loadingApi());
    yield axiosInstance.delete(`/resumes/${id}`);
    yield toast.success('Xóa CV thành công');
    yield put(deleteCvFinish(id));
  } catch (error) {
    yield toast.error(error.message);
    yield put(deleteCvFailure(error));
  }
}

export function* onLoadListCvAsync() {
  try {
    yield put(loadingApi());
    const { data } = yield axiosInstance.get(`/resumes`);
    yield put(loadListCvFinish(data?.data));
  } catch (error) {
    yield toast.error(error.message);
    yield put(loadListCvFailure(error));
  }
}

export function* onCreateCvAsync() {
  try {
    yield put(loadingApi());
    const { data } = yield axiosInstance.post(`/resumes`, CV_DATAS);
    yield put(createCvFinish(data?.data));
  } catch (error) {
    yield toast.error(error.message);
    yield put(createCvFinish(error));
  }
}

export function* onUpdateCvAsync({ payload: { id, updateData, config = {} } }) {
  try {
    yield put(loadingUpdate());
    const { data } = yield axiosInstance.patch(
      `/resumes/${id}`,
      updateData,
      config
    );
    yield put(updateCvFinish(data?.data));
    yield toast.success('Cập nhật thành công');
  } catch (error) {
    yield toast.error(error.message);
    yield put(updateCvFailure(error));
  }
}

export function* onLoadCvStart() {
  yield takeLatest(CvActionTypes.LOAD_CV_START, onLoadCvAsync);
}

export function* onDeleteCvStart() {
  yield takeLatest(CvActionTypes.DELETE_CV_START, onDeleteCvAsync);
}

export function* onLoadListCvStart() {
  yield takeLatest(CvActionTypes.LOAD_LIST_CV_START, onLoadListCvAsync);
}

export function* onUpdateCvStart() {
  yield takeLatest(CvActionTypes.UPDATE_CV_START, onUpdateCvAsync);
}

export function* onCreateCvStart() {
  yield takeLatest(CvActionTypes.CREATE_CV_START, onCreateCvAsync);
}

export function* cvSagas() {
  yield all([
    call(onLoadCvStart),
    call(onUpdateCvStart),
    call(onLoadListCvStart),
    call(onDeleteCvStart),
    call(onCreateCvStart),
  ]);
}
