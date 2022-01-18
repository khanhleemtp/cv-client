import { createSelector } from 'reselect';

const selectorJob = (state) => state.job;
// const selectorCart = (state) => state.cart;

export const selectJob = createSelector(selectorJob, (state) => state?.job);

export const selectListJob = createSelector(
  selectorJob,
  (state) => state?.listJob
);

export const selectTotalJob = createSelector(
  selectorJob,
  (state) => state?.total
);

export const selectResultJob = createSelector(
  selectorJob,
  (state) => state?.result
);

export const selectUpdatingJob = createSelector(
  selectorJob,
  (state) => state?.isUpdating
);

export const selectCreatingJob = createSelector(
  selectorJob,
  (state) => state?.isCreating
);

export const selectLoadingJob = createSelector(
  selectorJob,
  (state) => state?.isLoading
);

export const selectSingleLoadingJob = createSelector(
  selectorJob,
  (state) => state?.isSingleLoading
);

export const selectCompanyInJob = createSelector(
  selectJob,
  (state) => state?.companyInfo
);
