import { takeLatest, put, call, all } from 'redux-saga/effects';
import { JobActionTypes } from './job.types';
import axiosInstance from './../../api/axiosConfig';
import { toast } from 'react-toastify';
import {
  loadingCreate,
  createJobFailure,
  createJobSuccess,
  loadingJob,
  loadingJobFailure,
  loadingJobSuccess,
  loadingListJobFailure,
  loadingListJobSuccess,
  updateJobFailure,
  updateJobInList,
  updateJobSuccess,
  updatingJob,
  loadingSingleJob,
  loadingApplyJob,
  applyJobSuccess,
  applyJobFailure,
} from './job.action';

// import { merge } from 'lodash-es';

export function* createJob({ payload }) {
  try {
    yield put(loadingCreate());

    const {
      data: { data },
    } = yield axiosInstance.post(`/jobs`, payload);
    yield put(createJobSuccess(data));
    yield toast.success('Tạo công việc thành công');
  } catch (error) {
    yield toast.error(error?.message);
    yield put(createJobFailure(error?.message));
  }
}

export function* fetchCompanyDetails(id) {
  // let ids = yield data.map((item) => item?.company);

  // let dataCompany = yield all(ids.map((id) => call(fetchCompanyDetails, id)));
  // yield put(
  //   loadingListJobSuccess({
  //     result,
  //     total,

  //     data: merge(dataCompany, data),
  //   })
  // );

  const {
    data: { data },
  } = yield axiosInstance.get(`/companies/${id}?fields=logo,name`);
  return { companyInfo: data };
}

export function* loadListJob({ payload }) {
  try {
    yield put(loadingJob());
    const { data: dataFromServer } = yield axiosInstance.get(`/jobs${payload}`);
    const { data, result, total } = dataFromServer;
    // let ids = yield data.map((item) => item?.company);

    // let dataCompany = yield all(ids.map((id) => call(fetchCompanyDetails, id)));
    yield put(
      loadingListJobSuccess({
        result,
        total,
        data,
        // data: merge(dataCompany, data),
      })
    );
  } catch (error) {
    yield toast.error(error?.message);
    yield put(loadingListJobFailure(error?.message));
  }
}

export function* loadJob({ payload }) {
  try {
    yield put(loadingSingleJob());
    const {
      data: { data },
    } = yield axiosInstance.get(`/jobs/${payload}`);
    // const company = yield call(fetchCompanyDetails, data.company);
    yield put(loadingJobSuccess(data));
  } catch (error) {
    yield toast.error(error?.message);
    yield put(loadingJobFailure(error?.message));
  }
}

export function* updateJob({ payload }) {
  const { id, updateData, config = {} } = payload;
  try {
    yield put(updatingJob());
    const {
      data: { data },
    } = yield axiosInstance.patch(`/jobs/${id}`, updateData, config);
    yield put(updateJobSuccess(data));
    yield put(updateJobInList({ data, id: data.id }));
    yield toast.success('Cập nhật thành công');
  } catch (error) {
    yield toast.error(error?.message);
    yield put(updateJobFailure(error?.message));
  }
}

export function* applyJob({ payload: { jobId, resumeId } }) {
  try {
    yield put(loadingApplyJob());
    yield axiosInstance.post(`/resume-jobs`, {
      resume: resumeId,
      job: jobId,
      received: 'tiep-nhan',
    });
    yield put(applyJobSuccess());
    yield toast.success('Ứng tuyển thành công');
  } catch (error) {
    yield toast.error(error?.message);
    yield put(applyJobFailure(error?.message));
  }
}

// START
export function* onCreateJobStart() {
  yield takeLatest(JobActionTypes.CREATE_JOB_START, createJob);
}

export function* onLoadListJobStart() {
  yield takeLatest(JobActionTypes.LOAD_LIST_JOB_START, loadListJob);
}

export function* onUpdateJobStart() {
  yield takeLatest(JobActionTypes.UPDATE_JOB_START, updateJob);
}

export function* onLoadJobStart() {
  yield takeLatest(JobActionTypes.LOAD_JOB_START, loadJob);
}

export function* onApplyJobStart() {
  yield takeLatest(JobActionTypes.APPLY_JOB_START, applyJob);
}

export function* jobSagas() {
  yield all([
    call(onApplyJobStart),
    call(onCreateJobStart),
    call(onLoadListJobStart),
    call(onLoadJobStart),
    call(onUpdateJobStart),
  ]);
}
