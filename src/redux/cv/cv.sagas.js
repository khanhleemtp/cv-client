import { takeLatest, put, call, all } from 'redux-saga/effects';
// import { push } from 'connected-react-router';
// import { toast } from 'react-toastify';
import axiosInstance from './../../api/axiosConfig';
import { CvActionTypes } from './cv.types';
import { toast } from 'react-toastify';

import {
  loadingApi,
  loadCvFinish,
  loadCvFailure,
  updateCvFinish,
  updateCvFailure,
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

export function* onUpdateCvAsync({ payload: { id, updateData, config = {} } }) {
  try {
    yield put(loadingApi());
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

export function* onUpdateCvStart() {
  yield takeLatest(CvActionTypes.UPDATE_CV_START, onUpdateCvAsync);
}

export function* cvSagas() {
  yield all([call(onLoadCvStart), call(onUpdateCvStart)]);
}
