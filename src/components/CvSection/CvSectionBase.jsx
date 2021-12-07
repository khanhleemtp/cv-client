import { useFormContext, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateCvStart } from './../../redux/cv/cv.action';

import CvSummary from './CvSummary';
import CvEducation from './CvEducation';

import { selectSectionStart } from './../../redux/viewState/viewState.action';
import CvLanguage from './CvLanguage';
import { CV_SECTION_ITEM_DATA } from './cv.data';
import { has } from 'lodash';

const Base = ({ child: Child, ...otherProps }) => <Child {...otherProps} />;

const CV_SECTION_COMPONENT = {
  SummarySection: CvSummary,
  EducationSection: CvEducation,
  LanguageSection: CvLanguage,
};

const CvSectionBase = ({ record, index }) => {
  const { control, setValue, setFocus } = useFormContext();
  const dispatch = useDispatch();

  const cvData = useWatch({ control });

  const isEnabled = useWatch({
    control,
    name: `sections.${index}.enabled`,
  });

  const updateData = () => {
    dispatch(updateCvStart({ updateData: cvData, id: cvData.id }));
  };

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

  const upItem = (k, func, nextPosition, fieldFocus) => () => {
    func(k, k - 1);
    dispatch(selectSectionStart(nextPosition));
    setFocus(`${nextPosition}.${fieldFocus}`);
    updateData();
  };

  const downItem = (k, func, length, nextPosition, fieldFocus) => {
    return () => {
      func(k, k + 1);
      dispatch(selectSectionStart(nextPosition));
      setFocus(`${nextPosition}.${fieldFocus}`);
      updateData();
    };
  };

  const createItem = (func, nextPosition) => () => {
    func(CV_SECTION_ITEM_DATA[record]);
    dispatch(selectSectionStart(nextPosition));
    updateData();
  };

  const addItem = (func, nextPosition, index) => () => {
    func(index, CV_SECTION_ITEM_DATA[record]);
    dispatch(selectSectionStart(nextPosition));
    updateData();
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
      />
    );
  }
  return null;
};

export default CvSectionBase;
