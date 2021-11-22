import { CvActionTypes } from './cv.types';

const INITIAL_STATE = {
  selectedSection: null,
  error: null,
  isLoading: false,
};

const cvReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case UserActionTypes.GOOGLE_SIGN_IN_SUCCESS:
    // case UserActionTypes.EMAIL_SIGN_IN_SUCCESS:
    // case UserActionTypes.SET_CURRENT_USER:
    case CvActionTypes.SECTION_SELECTED:
      return {
        ...state,
        selectedSection: action.payload,
      };
    case CvActionTypes.SECTION_SELECTED_FINISH:
      return {
        ...state,
        selectedSection: null,
      };

    default:
      return state;
  }
};

export default cvReducer;
