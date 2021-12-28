import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  isLoadingUser: false,
  error: null,
  isLoading: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case UserActionTypes.GOOGLE_SIGN_IN_SUCCESS:
    // case UserActionTypes.EMAIL_SIGN_IN_SUCCESS:
    // case UserActionTypes.SET_CURRENT_USER:
    case UserActionTypes.LOADING_API:
      return {
        ...state,
        isLoading: true,
      };
    case UserActionTypes.LOADING_USER:
      return {
        ...state,
        isLoadingUser: true,
      };
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
        isLoading: false,
      };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      localStorage.clear();
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
