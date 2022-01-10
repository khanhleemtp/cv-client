import { CompanyActionTypes } from './company.types';

export const loadingRegister = () => ({
  type: CompanyActionTypes.LOADING_REGISTER_COMPANY,
});

export const loadingCompany = () => ({
  type: CompanyActionTypes.LOADING_COMPANY,
});

export const loadingSingleCompany = () => ({
  type: CompanyActionTypes.LOADING_SINGLE_COMPANY,
});

export const updatingCompany = () => ({
  type: CompanyActionTypes.UPDATING_COMPANY,
});

export const registerCompanyStart = (data) => ({
  type: CompanyActionTypes.REGISTER_COMPANY_START,
  payload: data,
});

export const registerCompanySuccess = () => ({
  type: CompanyActionTypes.REGISTER_COMPANY_SUCCESS,
});

export const registerCompanyFailure = (error) => ({
  type: CompanyActionTypes.REGISTER_COMPANY_FAILURE,
  payload: error,
});

export const loadCompanyStart = (data) => ({
  type: CompanyActionTypes.LOAD_COMPANY_START,
  payload: data,
});

export const loadCompanySuccess = (data) => ({
  type: CompanyActionTypes.LOAD_COMPANY_SUCCESS,
  payload: data,
});

export const loadCompanyFailure = (error) => ({
  type: CompanyActionTypes.LOAD_COMPANY_FAILURE,
  payload: error,
});

export const loadListCompanyStart = (query = '') => ({
  type: CompanyActionTypes.LOAD_LIST_COMPANY_START,
  payload: query,
});

export const loadListCompanySuccess = (data) => ({
  type: CompanyActionTypes.LOAD_LIST_COMPANY_SUCCESS,
  payload: data,
});

export const loadListCompanyFailure = (error) => ({
  type: CompanyActionTypes.LOAD_LIST_COMPANY_FAILURE,
  payload: error,
});

export const updateCompanyStart = (data) => ({
  type: CompanyActionTypes.UPDATE_COMPANY_START,
  payload: data,
});

export const updateCompanySuccess = (data) => ({
  type: CompanyActionTypes.UPDATE_COMPANY_SUCCESS,
  payload: data,
});

export const updateCompanyFailure = (error) => ({
  type: CompanyActionTypes.UPDATE_COMPANY_FAILURE,
  payload: error,
});

export const updateCompanyInList = (id, data) => ({
  type: CompanyActionTypes.UPDATE_COMPANY_IN_LIST,
  payload: { id, data },
});
