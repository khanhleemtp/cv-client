import { viewStateActionTypes } from './viewState.types';

export const selectSectionStart = (section) => ({
  type: viewStateActionTypes.SELECT_SECTION,
  payload: section,
});

export const selectSectionFinish = () => ({
  type: viewStateActionTypes.CLOSE_SECTION,
});

export const openField = (field) => ({
  type: viewStateActionTypes.OPEN_FIELD,
  payload: field,
});

export const closeField = () => ({
  type: viewStateActionTypes.CLOSE_FIELD,
});

export const openModal = (modalName, otherProps) => ({
  type: viewStateActionTypes.OPEN_MODAL,
  payload: {
    modalName,
    otherProps,
  },
});

export const closeModal = () => ({
  type: viewStateActionTypes.CLOSE_MODAL,
});

export const openPopover = (popoverName) => ({
  type: viewStateActionTypes.OPEN_POPOVER,
  payload: popoverName,
});

export const closePopover = () => ({
  type: viewStateActionTypes.CLOSE_POPOVER,
});
