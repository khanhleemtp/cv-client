import { CvActionTypes } from './cv.types';

const INITIAL_STATE = {
  error: null,
  isLoading: false,
  isUpdating: false,
  isCreating: false,
  cv: null,
  listCv: null,
  total: 0,
  result: 0,
};

const cvReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case UserActionTypes.GOOGLE_SIGN_IN_SUCCESS:
    // case UserActionTypes.EMAIL_SIGN_IN_SUCCESS:
    // case UserActionTypes.SET_CURRENT_USER:
    case CvActionTypes.LOADING_CREATE_CV:
      return {
        ...state,
        isCreating: true,
      };
    case CvActionTypes.LOADING_LIST_CV:
      return {
        ...state,
        isLoading: true,
      };
    case CvActionTypes.LOADING_UPDATE:
      return {
        ...state,
        isUpdating: true,
      };
    case CvActionTypes.LOAD_CV_FINISH:
      return {
        ...state,
        error: null,
        cv: action.payload,
        isLoading: false,
      };
    case CvActionTypes.DELETE_CV_FINISH:
      return {
        ...state,
        error: null,
        listCv: state?.listCv?.filter((cv) => cv._id !== action.payload),
        isLoading: false,
      };
    case CvActionTypes.LOAD_LIST_CV_FINISH:
      const { data, total, result } = action.payload;
      return {
        ...state,
        error: null,
        listCv: data,
        total: total,
        result: result,
        isLoading: false,
      };
    case CvActionTypes.CREATE_CV_FINISH:
      return {
        ...state,
        error: null,
        listCv: [action.payload, ...state?.listCv],
        isLoading: false,
        isCreating: false,
      };
    case CvActionTypes.UPDATE_CV_FINISH:
      return {
        ...state,
        error: null,
        cv: action.payload,
        isUpdating: false,
      };
    case CvActionTypes.CREATE_CV_FAILURE:
    case CvActionTypes.DELETE_CV_FAILURE:
    case CvActionTypes.UPDATE_CV_FAILURE:
    case CvActionTypes.LOAD_CV_FAILURE:
    case CvActionTypes.LOAD_LIST_CV_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        isUpdating: false,
        isCreating: false,
      };
    default:
      return state;
  }
};

export default cvReducer;
