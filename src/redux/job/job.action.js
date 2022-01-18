import { JobActionTypes } from './job.types';

export const loadingCreate = () => ({
  type: JobActionTypes.LOADING_CREATE_JOB,
});

export const loadingApplyJob = () => ({
  type: JobActionTypes.LOADING_APPLY_JOB,
});

export const loadingJob = () => ({
  type: JobActionTypes.LOADING_JOB,
});
export const loadingSingleJob = () => ({
  type: JobActionTypes.LOADING_SINGLE_JOB,
});

export const updatingJob = () => ({
  type: JobActionTypes.UPDATING_JOB,
});

export const loadingJobStart = (id) => ({
  type: JobActionTypes.LOAD_JOB_START,
  payload: id,
});

export const loadingJobSuccess = (data) => ({
  type: JobActionTypes.LOAD_JOB_SUCCESS,
  payload: data,
});

export const loadingJobFailure = (error) => ({
  type: JobActionTypes.LOAD_JOB_FAILURE,
  payload: error,
});

export const updateJobStart = (data) => ({
  type: JobActionTypes.UPDATE_JOB_START,
  payload: data,
});

export const updateJobSuccess = (data) => ({
  type: JobActionTypes.UPDATE_JOB_SUCCESS,
  payload: data,
});

export const updateJobFailure = (error) => ({
  type: JobActionTypes.UPDATE_JOB_FAILURE,
  payload: error,
});

export const createJobStart = (data) => ({
  type: JobActionTypes.CREATE_JOB_START,
  payload: data,
});

export const createJobSuccess = (data) => ({
  type: JobActionTypes.CREATE_JOB_SUCCESS,
  payload: data,
});

export const createJobFailure = (error) => ({
  type: JobActionTypes.CREATE_JOB_FAILURE,
  payload: error,
});

export const loadingListJobStart = (query) => ({
  type: JobActionTypes.LOAD_LIST_JOB_START,
  payload: query,
});

export const loadingListJobSuccess = (data) => ({
  type: JobActionTypes.LOAD_LIST_JOB_SUCCESS,
  payload: data,
});

export const loadingListJobFailure = (error) => ({
  type: JobActionTypes.LOAD_LIST_JOB_FAILURE,
  payload: error,
});

export const updateJobInList = (data) => ({
  type: JobActionTypes.UPDATE_JOB_IN_LIST,
  payload: data,
});

export const applyJobStart = (data) => ({
  type: JobActionTypes.APPLY_JOB_START,
  payload: data,
});

export const applyJobSuccess = (data) => ({
  type: JobActionTypes.APPLY_JOB_SUCCESS,
  payload: data,
});

export const applyJobFailure = (error) => ({
  type: JobActionTypes.APPLY_JOB_FAILURE,
  payload: error,
});
