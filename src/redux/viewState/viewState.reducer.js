import { viewStateActionTypes } from './viewState.types';

const initModal = {
  type: '',
  otherProps: {},
  isOpen: false,
};

const INITIAL_STATE = {
  section: null,
  modal: initModal,
  popover: null,
};

const viewStateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case viewStateActionTypes.SELECT_SECTION:
      return {
        ...state,
        popover: null,
        section: action.payload,
      };
    case viewStateActionTypes.CLOSE_SECTION:
      return {
        ...state,
        section: null,
        popover: null,
      };
    case viewStateActionTypes.OPEN_MODAL:
      return {
        ...state,
        modal: {
          ...state.modal,
          type: action.payload,
          isOpen: true,
        },
      };
    case viewStateActionTypes.CLOSE_MODAL:
      return {
        ...state,
        modal: initModal,
      };
    case viewStateActionTypes.OPEN_POPOVER:
      return {
        ...state,
        popover: action.payload,
      };
    case viewStateActionTypes.CLOSE_POPOVER:
      return {
        ...state,
        popover: null,
      };
    default:
      return state;
  }
};

export default viewStateReducer;
