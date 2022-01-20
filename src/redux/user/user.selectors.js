import { createSelector } from 'reselect';

const selectorUser = (state) => state.user;
// const selectorCart = (state) => state.cart;

export const selectCurrentUser = createSelector(
  selectorUser,
  (user) => user?.currentUser
);

export const selectSavedJobInCurrentUser = createSelector(
  selectCurrentUser,
  (user) => user?.savedJobs
);

export const selectListCvCurrentUser = createSelector(
  selectCurrentUser,
  (user) => user?.listCv
);

export const selectNotifications = createSelector(
  selectCurrentUser,
  (user) => user?.notifications
);

export const selectIdsCvCurrentUser = createSelector(
  selectListCvCurrentUser,
  (list) => list?.map((cv) => cv.id)
);

export const selectIsJobSaved = (jobId) =>
  createSelector(selectSavedJobInCurrentUser, (savedJob) => {
    if (!savedJob) return false;
    return Array.from(savedJob)?.find((job) => jobId === job?.id);
  });

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
