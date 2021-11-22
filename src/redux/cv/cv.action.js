import { CvActionTypes } from './cv.types';

export const selectedSectionStart = (section) => ({
  type: CvActionTypes.SECTION_SELECTED,
  payload: section,
});

export const selectedSectionFinish = () => ({
  type: CvActionTypes.SECTION_SELECTED_FINISH,
});
