import { EmployerActionTypes } from './employer.types';

const INITIAL_STATE = {
  error: null,
  isLoading: false,
  isUpdating: false,
  isLoadingApi: false,
  employer: null,
};

const employerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case UserActionTypes.GOOGLE_SIGN_IN_SUCCESS:
    // case UserActionTypes.EMAIL_SIGN_IN_SUCCESS:
    // case UserActionTypes.SET_CURRENT_USER:
    case EmployerActionTypes.LOADING_REGISTER_USER:
      return {
        ...state,
        isLoadingApi: true,
      };
    case EmployerActionTypes.LOADING_EMPLOYER:
      return {
        ...state,
        isLoading: true,
      };
    case EmployerActionTypes.UPDATING_EMPLOYER:
      return {
        ...state,
        isUpdating: true,
      };
    case EmployerActionTypes.REGISTER_EMPLOYER_SUCCESS: {
      return {
        ...state,
        isLoadingApi: false,
        error: null,
      };
    }
    case EmployerActionTypes.LOAD_EMPLOYER_SUCCESS:
    case EmployerActionTypes.UPDATE_EMPLOYER_SUCCESS:
      return {
        ...state,
        employer: action.payload,
        isLoading: false,
        isUpdating: false,
        error: null,
      };
    case EmployerActionTypes.UPDATE_EMPLOYER_FAILURE:
    case EmployerActionTypes.LOAD_EMPLOYER_FAILURE:
    case EmployerActionTypes.REGISTER_EMPLOYER_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        isUpdating: false,
        isLoadingApi: false,
      };

    default:
      return state;
  }
};

export default employerReducer;
