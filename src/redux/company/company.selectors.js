import { createSelector } from 'reselect';

const selectorCompany = (state) => state.company;
// const selectorCart = (state) => state.cart;

export const selectCompany = createSelector(
  selectorCompany,
  (state) => state?.company
);

export const selectorListCompany = createSelector(
  selectorCompany,
  (state) => state?.listCompany
);

export const selectTotalCompany = createSelector(
  selectorListCompany,
  (state) => state?.total
);

export const selectResultCompany = createSelector(
  selectorListCompany,
  (state) => state?.result
);

export const selectListCompany = createSelector(
  selectorListCompany,
  (state) => state?.data
);

export const selectLoadingCompany = createSelector(
  selectorCompany,
  (state) => state.isLoading
);

export const selectUpdatingCompany = createSelector(
  selectorCompany,
  (state) => state.isUpdating
);

export const selectSingleLoadingCompany = createSelector(
  selectorCompany,
  (state) => state.isSingleLoading
);
