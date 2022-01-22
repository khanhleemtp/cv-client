import { ResumeJobActionTypes } from './resumeJob.types';

export const loadingCreate = () => ({
  type: ResumeJobActionTypes.LOADING_CREATE_RESUME_RESUME_JOB,
});

export const loadingList = () => ({
  type: ResumeJobActionTypes.LOADING_RESUME_JOB,
});

export const loadingUpdate = () => ({
  type: ResumeJobActionTypes.UPDATING_RESUME_JOB,
});

export const loadListResumeJobStart = (query) => ({
  type: ResumeJobActionTypes.LOAD_LIST_RESUME_JOB_START,
  payload: query,
});

export const loadListResumeJobSuccess = (data) => ({
  type: ResumeJobActionTypes.LOAD_LIST_RESUME_JOB_SUCCESS,
  payload: data,
});

export const loadListResumeJobFailure = (error) => ({
  type: ResumeJobActionTypes.LOAD_LIST_RESUME_JOB_FAILURE,
  payload: error,
});

export const updateResumeJobStart = (data) => ({
  type: ResumeJobActionTypes.UPDATE_RESUME_JOB_START,
  payload: data,
});

export const updateResumeJobSuccess = (data) => ({
  type: ResumeJobActionTypes.UPDATE_RESUME_JOB_SUCCESS,
  payload: data,
});

export const updateResumeJobFailure = (error) => ({
  type: ResumeJobActionTypes.UPDATE_RESUME_JOB_FAILURE,
  payload: error,
});

export const updateResumeJobInList = (payload) => ({
  type: ResumeJobActionTypes.UPDATE_RESUME_JOB_IN_LIST,
  payload,
});

export const loadingInfoChart = () => ({
  type: ResumeJobActionTypes.LOADING_INFO_CHART,
});

export const loadInfoChartStart = (qr) => ({
  type: ResumeJobActionTypes.LOAD_INFO_CHART_START,
  payload: qr,
});

export const loadInfoChartSuccess = (data) => ({
  type: ResumeJobActionTypes.LOAD_INFO_CHART_SUCCESS,
  payload: data,
});

export const loadInfoChartFailure = (err) => ({
  type: ResumeJobActionTypes.LOAD_INFO_CHART_FAILURE,
  payload: err,
});
