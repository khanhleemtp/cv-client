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
