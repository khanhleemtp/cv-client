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

export const selectLoadingListEmployer = createSelector(
  selectorEmployer,
  (employer) => employer.isLoadingList
);

export const selectUpdatingEmployer = createSelector(
  selectorEmployer,
  (employer) => employer.isUpdating
);

export const selectCompanyEmployer = createSelector(
  selectEmployer,
  (employer) => employer?.company
);

export const selectEmployerHost = createSelector(
  selectEmployer,
  (employer) => employer?.id === employer?.company?.host
);

export const selectlistEmployer = createSelector(
  selectorEmployer,
  (employer) => employer?.listEmployer
);

export const selectTotalEmployer = createSelector(
  selectorEmployer,
  (employer) => employer?.total
);
