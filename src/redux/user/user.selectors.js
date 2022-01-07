import { createSelector } from 'reselect';

const selectorUser = (state) => state.user;
// const selectorCart = (state) => state.cart;

export const selectCurrentUser = createSelector(
  selectorUser,
  (user) => user?.currentUser
);

export const selectUpdateUser = createSelector(
  selectorUser,
  (user) => user?.isUpdating
);

export const selectUserResumes = createSelector(
  selectCurrentUser,
  (user) => user?.resumes
);

export const selectLoadingApi = createSelector(
  selectorUser,
  (user) => user.isLoading
);
