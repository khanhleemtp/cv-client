import { createSelector } from 'reselect';
import keyBy from 'lodash-es/keyBy';

const selectorResumeJob = (state) => state.resumeJob;
// const selectorCart = (state) => state.cart;

export const selectListResumeJob = createSelector(
  selectorResumeJob,
  (state) => state?.listResumeJob
);
export const selectLoadingListResumeJob = createSelector(
  selectorResumeJob,
  (state) => state?.isLoading
);

export const selectTotalResumeJob = createSelector(
  selectorResumeJob,
  (state) => state?.total
);

export const selectResultResumeJob = createSelector(
  selectorResumeJob,
  (state) => state?.result
);

export const selectJobInResumeJob = (id) =>
  createSelector(
    selectListResumeJob,
    (listResumeJob) => keyBy(listResumeJob, 'job')[id]?.jobInfo
  );

export const selectIdsInResumeJob = createSelector(
  selectListResumeJob,
  (listResumeJob) => keyBy(listResumeJob, 'resume')
);
// console.log(keyBy(listResumeJob, 'job'));
