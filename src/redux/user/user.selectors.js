import { createSelector } from 'reselect';

const selectorUser = (state) => state.user;
// const selectorCart = (state) => state.cart;

export const selectCurrentUser = createSelector(
  selectorUser,
  (user) => user.currentUser
);

export const selectLoadingApi = createSelector(
  selectorUser,
  (user) => user.isLoading
);
