import { viewStateActionTypes } from './viewState.types';

const initModal = {
  type: '',
  otherProps: {},
  isOpen: false,
};

const INITIAL_STATE = {
  field: null,
  modal: initModal,
  section: null,
  item: null,
  popover: null,
};

const viewStateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case viewStateActionTypes.OPEN_FIELD:
      return {
        ...state,
        field: action.payload,
      };
    case viewStateActionTypes.CLOSE_FIELD:
      return {
        ...state,
        field: null,
      };
    case viewStateActionTypes.SELECT_SECTION:
      return {
        ...state,
        section: action.payload,
      };
    case viewStateActionTypes.CLOSE_SECTION:
      return {
        ...state,
        section: null,
        popover: null,
      };
    case viewStateActionTypes.OPEN_MODAL:
      const { modalName, otherProps } = action.payload;
      return {
        ...state,
        modal: {
          type: modalName,
          isOpen: true,
          otherProps,
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
    case viewStateActionTypes.SET_FIELDS:
      return {
        ...state,
        ...action.payload,
      };
    case viewStateActionTypes.CLEAR_BACKGROUND:
      return {
        ...state,
        field: null,
        section: null,
        item: null,
        popover: null,
      };
    default:
      return state;
  }
};

export default viewStateReducer;
