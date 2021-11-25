import { viewStateActionTypes } from './viewState.types';

export const selectSectionStart = (section) => ({
  type: viewStateActionTypes.SELECT_SECTION,
  payload: section,
});

export const selectSectionFinish = () => ({
  type: viewStateActionTypes.CLOSE_SECTION,
});

export const openModal = (modalName) => ({
  type: viewStateActionTypes.OPEN_MODAL,
  payload: modalName,
});

export const closeModal = () => ({
  type: viewStateActionTypes.CLOSE_MODAL,
});
