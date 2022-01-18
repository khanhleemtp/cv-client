import { CompanyActionTypes } from './company.types';
import keyBy from 'lodash-es/keyBy';

const INITIAL_STATE = {
  error: null,
  isLoading: false,
  isSingleLoading: false,
  isUpdating: false,
  isRegistering: false,
  company: null,
  listCompany: null,
  total: 0,
  result: 0,
};

const employerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case UserActionTypes.GOOGLE_SIGN_IN_SUCCESS:
    // case UserActionTypes.EMAIL_SIGN_IN_SUCCESS:
    // case UserActionTypes.SET_CURRENT_USER:
    case CompanyActionTypes.LOADING_REGISTER_COMPANY:
      return {
        ...state,
        isRegistering: true,
      };
    case CompanyActionTypes.LOADING_COMPANY:
      return {
        ...state,
        isLoading: true,
      };
    case CompanyActionTypes.LOADING_SINGLE_COMPANY:
      return {
        ...state,
        isSingleLoading: true,
      };
    case CompanyActionTypes.UPDATING_COMPANY:
      return {
        ...state,
        isUpdating: true,
      };
    case CompanyActionTypes.REGISTER_COMPANY_SUCCESS: {
      return {
        ...state,
        isRegistering: false,
        error: null,
      };
    }
    case CompanyActionTypes.UPDATE_COMPANY_SUCCESS:
    case CompanyActionTypes.LOAD_COMPANY_SUCCESS: {
      return {
        ...state,
        company: action.payload,
        isLoading: false,
        isSingleLoading: false,
        isUpdating: false,
        error: null,
      };
    }
    case CompanyActionTypes.LOAD_LIST_COMPANY_SUCCESS: {
      const { data, total, result } = action.payload;
      return {
        ...state,
        listCompany: data,
        total,
        result,
        isLoading: false,
        error: null,
      };
    }
    case CompanyActionTypes.LOAD_LIST_COMPANY_FAILURE:
    case CompanyActionTypes.REGISTER_COMPANY_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        isSingleLoading: false,
        isUpdating: false,
        isRegistering: false,
      };
    case CompanyActionTypes.UPDATE_COMPANY_IN_LIST:
      const { id, data } = action.payload;
      const listCompany = state.listCompany;
      const objectListCompany = keyBy(listCompany, 'id');
      objectListCompany[id] = data;
      const newCompany = Object.values(objectListCompany);
      return {
        ...state,
        listCompany: newCompany,
      };
    default:
      return state;
  }
};

export default employerReducer;
