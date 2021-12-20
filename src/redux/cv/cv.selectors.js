import { createSelector } from 'reselect';
import { groupBy } from './../../utils/groupBy';

const selectorCv = (state) => state.cv;
// const selectorCart = (state) => state.cart;

export const selectLoadingApi = createSelector(
  selectorCv,
  (state) => state.isLoading
);

export const selectUpdatingCv = createSelector(
  selectorCv,
  (state) => state.isUpdating
);

export const selectCvData = createSelector(selectorCv, (state) => state.cv);

export const selectSectionNormalize = createSelector(selectCvData, (cv) => {
  if (cv?.style.layout === 'single')
    return {
      0: cv?.sections,
    };
  return groupBy(cv?.sections, 'column');
});

export const selectCvLayout = createSelector(selectCvData, (cv) => {
  return cv?.style?.layout;
});

export const selectListCvData = createSelector(
  selectorCv,
  (state) => state.listCv
);

export const selectCvSections = createSelector(
  selectCvData,
  (cv) => cv?.sections
);

export const selectCvStyle = createSelector(selectCvData, (cv) => cv?.style);

export const selectCvSection = (sectionName) =>
  createSelector(selectCvSections, (sections) =>
    sections.filter((section) => section?.record === sectionName)
  );

export const selectCvHeader = createSelector(selectCvData, (cv) => cv?.header);
export const selectCvTitle = createSelector(selectCvData, (cv) => cv?.title);

export const selectCvPhoto = createSelector(
  selectCvHeader,
  (header) => header?.photo
);
