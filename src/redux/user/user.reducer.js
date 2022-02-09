import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  isLoadingUser: false,
  error: null,
  isLoading: false,
  isLoadingVerify: false,
  isUpdating: false,
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
    case UserActionTypes.UPDATE_USER:
      return {
        ...state,
        isUpdating: true,
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
    case UserActionTypes.VERIFY_SUCCESS:
      return {
        ...state,
        error: null,
        isLoadingVerify: false,
      };
    case UserActionTypes.LOADING_VERIFY:
      return {
        ...state,
        isLoadingVerify: true,
      };
    case UserActionTypes.VERIFY_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoadingVerify: false,
      };
    case UserActionTypes.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        error: null,
      };
    case UserActionTypes.UPDATE_INFO_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        currentUser: action.payload,
        error: null,
      };
    case UserActionTypes.UPDATE_LIST_CV_IN_USER: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          listCv: [action.payload, ...state.currentUser?.listCv],
        },
      };
    }
    case UserActionTypes.VIEW_NOTI: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifications: state.currentUser?.notifications?.map((item) => ({
            ...item,
            view: true,
          })),
        },
      };
    }
    case UserActionTypes.DELETE_CV_IN_USER: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          listCv: state.currentUser?.listCv?.filter(
            (cv) => cv?.id !== action.payload
          ),
        },
      };
    }
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
    case UserActionTypes.UPDATE_PASSWORD_FAILURE:
    case UserActionTypes.UPDATE_INFO_FAILURE:
      // localStorage.clear();
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        isLoadingVerify: false,
        isUpdating: false,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default userReducer;
