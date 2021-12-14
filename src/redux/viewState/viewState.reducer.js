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
  field: null,
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
    default:
      return state;
  }
};

export default viewStateReducer;
