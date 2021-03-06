import { takeLatest, put, call, all } from 'redux-saga/effects';
import { ResumeJobActionTypes } from './resumeJob.types';
import axiosInstance from '../../api/axiosConfig';
import { toast } from 'react-toastify';
// import { merge } from 'lodash-es';

// import { merge } from 'lodash-es';
import {
  loadingList,
  loadListResumeJobFailure,
  loadListResumeJobSuccess,
  loadingUpdate,
  updateResumeJobFailure,
  updateResumeJobSuccess,
  loadingInfoChart,
  loadInfoChartFailure,
  loadInfoChartSuccess,
  loadInfoCardSuccess,
} from './resumeJob.action';

export function* fetchInfoResume(id) {
  const {
    data: { data },
  } = yield axiosInstance.get(`/resumes/${id}`);
  return { resumeData: data };
}

export function* loadListResumeJob({ payload }) {
  try {
    yield put(loadingList());
    const { data: dataFromServer } = yield axiosInstance.get(
      `/resume-jobs${payload}`
    );
    const { data, result, total } = dataFromServer;
    // let ids = yield data.map((item) => item?.resume);

    // let dataResume = yield all(ids.map((id) => call(fetchInfoResume, id)));
    yield put(
      loadListResumeJobSuccess({
        result,
        total,
        data: data,
      })
    );
  } catch (error) {
    yield loadListResumeJobFailure(error?.message);
    yield toast.error(error?.message);
    yield put(error?.message);
  }
}

export function* updateResumeJob({ payload }) {
  const { id, updateData, config = {} } = payload;
  try {
    yield put(loadingUpdate());
    const {
      data: { data },
    } = yield axiosInstance.patch(`/resume-jobs/${id}`, updateData, config);
    yield put(updateResumeJobSuccess(data));
    yield toast.success('Phản hồi thành công');
  } catch (error) {
    yield toast.error(error?.message);
    yield put(updateResumeJobFailure(error?.message));
  }
}

export function* loadInfoChart({ payload }) {
  try {
    yield put(loadingInfoChart());
    const {
      data: { data },
    } = yield axiosInstance.get(`/resume-jobs/info-job-chart${payload}`);
    yield put(loadInfoChartSuccess(data));
  } catch (error) {
    yield toast.error(error?.message);
    yield put(loadInfoChartFailure(error?.message));
  }
}

export function* loadInfoCard({ payload }) {
  try {
    const { data } = yield axiosInstance.get(
      `/resume-jobs/cv-in-company${payload}`
    );
    console.log('infoCard', data);
    yield put(loadInfoCardSuccess(data));
  } catch (error) {
    yield toast.error(error?.message);
  }
}

export function* onLoadListResumeJobStart() {
  yield takeLatest(
    ResumeJobActionTypes.LOAD_LIST_RESUME_JOB_START,
    loadListResumeJob
  );
}

export function* onUpdateResumeJobStart() {
  yield takeLatest(
    ResumeJobActionTypes.UPDATE_RESUME_JOB_START,
    updateResumeJob
  );
}
export function* onLoadInfoChart() {
  yield takeLatest(ResumeJobActionTypes.LOAD_INFO_CHART_START, loadInfoChart);
}
export function* onLoadInfoCard() {
  yield takeLatest(ResumeJobActionTypes.LOAD_INFO_CARD_START, loadInfoCard);
}
export function* resumeJobSagas() {
  yield all([
    call(onLoadListResumeJobStart),
    call(onUpdateResumeJobStart),
    call(onLoadInfoChart),
    call(onLoadInfoCard),
  ]);
}
