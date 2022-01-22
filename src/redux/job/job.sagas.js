import { takeLatest, put, call, all, select } from 'redux-saga/effects';
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
  updateJobStart,
} from './job.action';

// import { merge } from 'lodash-es';
import keyBy from 'lodash-es/keyBy';
import { updateResumeJobSuccess } from '../resumeJob/resumeJob.action';

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

export function* applyJob({ payload: { job, resumeId, name } }) {
  try {
    yield put(loadingApplyJob());
    yield axiosInstance.post(`/resume-jobs`, {
      resume: resumeId,
      job: job?.id,
      response: 'chua-phan-hoi',
      title: job?.title,
      company: job?.companyInfo?.id,
      name,
    });
    yield put(applyJobSuccess());
    yield toast.success('Ứng tuyển thành công');
  } catch (error) {
    yield toast.error(error?.message);
    yield put(applyJobFailure(error?.message));
  }
}

export function* saveCv({ payload }) {
  const { jobId, cvId } = payload;
  const listResumeJob = yield select((state) => state.resumeJob.listResumeJob);

  yield console.log('jobId', jobId, 'cvId', cvId, listResumeJob);

  const resumeJob = yield keyBy(listResumeJob, 'job')[jobId];
  const cvInfo = yield keyBy(listResumeJob, 'resume')[cvId];

  const jobInfo = yield resumeJob?.jobInfo;

  const listSavedCv = yield jobInfo?.listSavedCv;

  let newListSavedCvData = yield [...listSavedCv];
  if (Array.from(newListSavedCvData)?.findIndex((i) => i.id === cvId) === -1) {
    newListSavedCvData = [...listSavedCv, cvInfo];
  } else {
    newListSavedCvData = listSavedCv?.filter((item) => item.id !== cvId);
  }

  const savedCv = yield jobInfo?.savedCv;

  let newListSavedCv = yield [...savedCv];
  if (Array.from(savedCv)?.findIndex((i) => i === cvId) === -1) {
    newListSavedCv = [...savedCv, cvId];
  } else {
    newListSavedCv = savedCv?.filter((item) => item !== cvId);
  }
  const newResumeJobInfo = {
    ...resumeJob,
    jobInfo: {
      ...jobInfo,
      savedCv: newListSavedCv,
      listSavedCv: newListSavedCvData,
    },
  };

  yield put(
    updateJobStart({
      id: jobId,
      updateData: {
        savedCv: newListSavedCv,
      },
    })
  );

  yield put(updateResumeJobSuccess(newResumeJobInfo));
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

export function* onSaveCvStart() {
  yield takeLatest(JobActionTypes.SAVE_CV_JOB_START, saveCv);
}

export function* jobSagas() {
  yield all([
    call(onApplyJobStart),
    call(onCreateJobStart),
    call(onLoadListJobStart),
    call(onLoadJobStart),
    call(onUpdateJobStart),
    call(onSaveCvStart),
  ]);
}
