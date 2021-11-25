import { createSelector } from 'reselect';

const selectorCv = (state) => state.cv;
// const selectorCart = (state) => state.cart;

export const selectLoadingApi = createSelector(
  selectorCv,
  (state) => state.isLoading
);

export const selectCvData = createSelector(selectorCv, (state) => state.cv);

export const selectCvHeader = createSelector(selectCvData, (cv) => cv.header);

export const selectCvPhoto = createSelector(
  selectCvHeader,
  (header) => header.photo
);
