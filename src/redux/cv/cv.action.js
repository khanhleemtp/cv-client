import { CvActionTypes } from './cv.types';

export const loadingApi = () => ({
  type: CvActionTypes.LOADING_LIST_CV,
});

export const loadingCreateCv = () => ({
  type: CvActionTypes.LOADING_CREATE_CV,
});

export const loadingUpdate = () => ({
  type: CvActionTypes.LOADING_UPDATE,
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

export const loadListCvStart = (query) => ({
  type: CvActionTypes.LOAD_LIST_CV_START,
  payload: query,
});

export const loadListCvFinish = (cvData) => ({
  type: CvActionTypes.LOAD_LIST_CV_FINISH,
  payload: cvData,
});

export const loadListCvFailure = (errorMsg) => ({
  type: CvActionTypes.LOAD_LIST_CV_FAILURE,
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

export const deleteCvStart = (id) => ({
  type: CvActionTypes.DELETE_CV_START,
  payload: id,
});

export const deleteCvFinish = (id) => ({
  type: CvActionTypes.DELETE_CV_FINISH,
  payload: id,
});

export const deleteCvFailure = (errorMsg) => ({
  type: CvActionTypes.DELETE_CV_FAILURE,
  payload: errorMsg,
});

export const createCvStart = () => ({
  type: CvActionTypes.CREATE_CV_START,
});

export const createCvFinish = (newCv) => ({
  type: CvActionTypes.CREATE_CV_FINISH,
  payload: newCv,
});

export const createCvFailure = (errorMsg) => ({
  type: CvActionTypes.CREATE_CV_FAILURE,
  payload: errorMsg,
});
