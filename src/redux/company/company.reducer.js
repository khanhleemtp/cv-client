import { CompanyActionTypes } from './company.types';

const INITIAL_STATE = {
  error: null,
  isLoading: false,
  isUpdating: false,
  isRegistering: false,
  company: null,
  listCompany: null,
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
        isUpdating: false,
        error: null,
      };
    }
    case CompanyActionTypes.LOAD_LIST_COMPANY_SUCCESS: {
      return {
        ...state,
        listCompany: action.payload,
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
        isUpdating: false,
        isRegistering: false,
      };

    default:
      return state;
  }
};

export default employerReducer;
