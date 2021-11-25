import { CvActionTypes } from './cv.types';

export const loadingApi = () => ({
  type: CvActionTypes.LOADING_API,
});

export const loadCvStart = (id) => ({
  type: CvActionTypes.LOAD_CV_START,
  payload: id,
});

export const loadCvFinish = (cvData) => ({
  type: CvActionTypes.LOAD_CV_FINISH,
  payload: cvData,
});

export const loadCvFailure = (errorMsg) => ({
  type: CvActionTypes.LOAD_CV_FAILURE,
  payload: errorMsg,
});

export const updateCvStart = (data) => ({
  type: CvActionTypes.UPDATE_CV_START,
  payload: data,
});

export const updateCvFinish = (newCv) => ({
  type: CvActionTypes.UPDATE_CV_FINISH,
  payload: newCv,
});

export const updateCvFailure = (errorMsg) => ({
  type: CvActionTypes.UPDATE_CV_FAILURE,
  payload: errorMsg,
});
