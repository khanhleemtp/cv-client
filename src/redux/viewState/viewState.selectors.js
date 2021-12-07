import { createSelector } from 'reselect';

const selectorViewState = (state) => state.viewState;
// const selectorCart = (state) => state.cart;

export const selectSelectedSection = createSelector(
  selectorViewState,
  (viewState) => viewState.section
);

export const selectIsCurrentSection = (currentSection) =>
  createSelector(
    selectSelectedSection,
    (prevSection) => prevSection === currentSection
  );

export const selectModal = createSelector(
  selectorViewState,
  (viewState) => viewState.modal
);

export const selectTypeModal = createSelector(
  selectModal,
  (modal) => modal.type
);

export const selectIsOpenModal = createSelector(
  selectModal,
  (modal) => modal.isOpen
);

export const selectSelectedPopover = createSelector(
  selectorViewState,
  (viewState) => viewState.popover
);

export const selectIsCurrentPopover = (currentPopover) =>
  createSelector(
    selectSelectedPopover,
    (prevPopover) => prevPopover === currentPopover
  );
