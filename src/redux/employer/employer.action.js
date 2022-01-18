import { EmployerActionTypes } from './employer.types';

export const loadingRegister = () => ({
  type: EmployerActionTypes.LOADING_REGISTER_USER,
});

export const loadingEmployer = () => ({
  type: EmployerActionTypes.LOADING_EMPLOYER,
});

export const loadingListEmployer = () => ({
  type: EmployerActionTypes.LOADING_LIST_EMPLOYER,
});

export const updatingEmployer = () => ({
  type: EmployerActionTypes.UPDATING_EMPLOYER,
});

export const loadingEmployerStart = (id) => ({
  type: EmployerActionTypes.LOAD_EMPLOYER_START,
  payload: id,
});

export const loadingEmployerSuccess = (data) => ({
  type: EmployerActionTypes.LOAD_EMPLOYER_SUCCESS,
  payload: data,
});

export const loadingEmployerFailure = (error) => ({
  type: EmployerActionTypes.LOAD_EMPLOYER_FAILURE,
  payload: error,
});

export const updateEmployerStart = (data, isUpdate = true) => ({
  type: EmployerActionTypes.UPDATE_EMPLOYER_START,
  payload: { data, isUpdate },
});

export const updateEmployerSuccess = (data) => ({
  type: EmployerActionTypes.UPDATE_EMPLOYER_SUCCESS,
  payload: data,
});

export const updateEmployerFailure = (error) => ({
  type: EmployerActionTypes.UPDATE_EMPLOYER_FAILURE,
  payload: error,
});

export const registerEmployerStart = (data) => ({
  type: EmployerActionTypes.REGISTER_EMPLOYER_START,
  payload: data,
});

export const registerEmployerSuccess = () => ({
  type: EmployerActionTypes.REGISTER_EMPLOYER_SUCCESS,
});

export const registerEmployerFailure = (error) => ({
  type: EmployerActionTypes.REGISTER_EMPLOYER_FAILURE,
  payload: error,
});

export const loadListEmployerStart = (query) => ({
  type: EmployerActionTypes.LOAD_LIST_EMPLOYER_START,
  payload: query,
});

export const loadListEmployerSuccess = (data) => ({
  type: EmployerActionTypes.LOAD_LIST_EMPLOYER_SUCCESS,
  payload: data,
});

export const loadListEmployerFailure = (error) => ({
  type: EmployerActionTypes.LOAD_LIST_EMPLOYER_FAILURE,
  payload: error,
});
