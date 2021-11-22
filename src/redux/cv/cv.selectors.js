import { createSelector } from 'reselect';

const selectorCv = (state) => state.cv;
// const selectorCart = (state) => state.cart;

export const selectBackground = createSelector(
  selectorCv,
  (cv) => cv.selectedSection
);

export const selectSectionSelected = (section) =>
  createSelector(selectBackground, (sectionName) => sectionName === section);
