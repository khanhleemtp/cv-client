import { createSelector } from 'reselect';

const selectorEmployer = (state) => state.employer;
// const selectorCart = (state) => state.cart;

export const selectEmployer = createSelector(
  selectorEmployer,
  (employer) => employer?.employer
);

export const selectLoadingEmployer = createSelector(
  selectorEmployer,
  (employer) => employer.isLoading
);

export const selectUpdatingEmployer = createSelector(
  selectorEmployer,
  (employer) => employer.isUpdating
);
