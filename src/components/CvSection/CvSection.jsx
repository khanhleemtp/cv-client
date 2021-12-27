import { useFormContext, useWatch } from 'react-hook-form';
import { useDispatch, connect } from 'react-redux';
import { updateCvStart } from '../../redux/cv/cv.action';
import { useCallback } from 'react';
import CvSummary from './CvSummary';
import CvEducation from './CvEducation';

import {
  openModal,
  selectSectionStart,
} from '../../redux/viewState/viewState.action';

import CvLanguage from './CvLanguage';
import { CV_SECTION_ITEM_DATA } from './cv.data';
import CvExperience from './CvExperience';
import CvTechnology from './CvTechnology';
import { has } from 'lodash-es';

const Base = ({ child: Child, ...otherProps }) => <Child {...otherProps} />;

const CV_SECTION_COMPONENT = {
  SummarySection: CvSummary,
  EducationSection: CvEducation,
  LanguageSection: CvLanguage,
  ExperienceSection: CvExperience,
  TechnologySection: CvTechnology,
};

const CvSection = ({ record, index, dragCvModal }) => {
  const { control, setValue, setFocus, getValues } = useFormContext();
  const dispatch = useDispatch();

  const isEnabled = useWatch({
    control,
    name: `sections.${index}.enabled`,
  });

  const updateData = useCallback(() => {
    const cvData = getValues();
    dispatch(updateCvStart({ updateData: cvData, id: cvData.id }));
  }, [dispatch, getValues]);

  const removeSection = () => {
    setValue(`sections.${index}.enabled`, false);
    updateData();
  };

  const removeItem = (index, func, nextPosition, fieldFocus) => () => {
    if (index === 0) return;
    func(index);
    dispatch(selectSectionStart(nextPosition));
    setFocus(`${nextPosition}.${fieldFocus}`);
    updateData();
  };

  const upItem = (k, func, nextPosition, fieldFocus) => {
    if (k === 0) return null;
    return () => {
      func(k, k - 1);
      dispatch(selectSectionStart(nextPosition));
      setFocus(`${nextPosition}.${fieldFocus}`);
      updateData();
    };
  };

  const downItem = (k, func, nextPosition, fieldFocus, length) => {
    if (k === length - 1) return null;
    return () => {
      func(k, k + 1);
      dispatch(selectSectionStart(nextPosition));
      setFocus(`${nextPosition}.${fieldFocus}`);
      updateData();
    };
  };

  const createItem = (func, nextPosition) => () => {
    func(CV_SECTION_ITEM_DATA[record]);
    updateData();
    dispatch(selectSectionStart(nextPosition));
  };

  const addItem = (func, nextPosition, index, field) => () => {
    func(index, CV_SECTION_ITEM_DATA[record], {
      focusName: `${nextPosition}.${field}`,
    });
    updateData();
    dispatch(selectSectionStart(nextPosition));
  };

  if (has(CV_SECTION_COMPONENT, record) && isEnabled) {
    return (
      <Base
        index={index}
        createItem={createItem}
        removeSection={removeSection}
        removeItem={removeItem}
        upItem={upItem}
        downItem={downItem}
        updateData={updateData}
        addItem={addItem}
        child={CV_SECTION_COMPONENT[record]}
        dragCvModal={dragCvModal}
      />
    );
  }
  return null;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  dragCvModal: () =>
    dispatch(
      openModal('SECTION_CV', {
        title: 'Thay đổi thứ tự',
        type: 'DRAG',
        move: ownProps?.move,
        update: ownProps?.update,
      })
    ),
});

export default connect(null, mapDispatchToProps)(CvSection);
