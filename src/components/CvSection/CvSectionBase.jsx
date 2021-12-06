import { useCallback } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateCvStart } from './../../redux/cv/cv.action';

import CvSummary from './CvSummary';
import CvEducation from './CvEducation';

import {
  selectSectionStart,
  selectSectionFinish,
} from './../../redux/viewState/viewState.action';
import CvLanguage from './CvLanguage';
import { CV_SECTION_ITEM_DATA } from './cv.data';

const CvSectionBase = ({ record, index }) => {
  const { control, setValue, setFocus } = useFormContext();
  const dispatch = useDispatch();

  const cvData = useWatch({ control });

  const isEnabled = useWatch({
    control,
    name: `sections.${index}.enabled`,
  });

  const renderSection = useCallback(() => {
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
    };

    const downItem = (k, func, length, nextPosition, fieldFocus) => {
      return () => {
        func(k, k + 1);
        dispatch(selectSectionStart(nextPosition));
        setFocus(`${nextPosition}.${fieldFocus}`);
      };
    };

    const createItem = (func, nextPosition, fieldFocus) => () => {
      func(CV_SECTION_ITEM_DATA[record]);
      dispatch(selectSectionStart(nextPosition));
      updateData();
    };

    const addItem = (func, nextPosition, fieldFocus, index) => () => {
      dispatch(selectSectionFinish());
      updateData();
      func(index, CV_SECTION_ITEM_DATA[record]);

      dispatch(selectSectionStart(nextPosition));
      // setFocus(`${nextPosition}.${fieldFocus}`);
    };

    switch (record) {
      case 'SummarySection':
        return (
          <CvSummary
            index={index}
            createItem={createItem}
            removeSection={removeSection}
            removeItem={removeItem}
            upItem={upItem}
            downItem={downItem}
            updateData={updateData}
            addItem={addItem}
          />
        );
      case 'EducationSection':
        return (
          <CvEducation
            index={index}
            createItem={createItem}
            removeSection={removeSection}
            removeItem={removeItem}
            upItem={upItem}
            downItem={downItem}
            updateData={updateData}
            addItem={addItem}
          />
        );
      case 'LanguageSection':
        return (
          <CvLanguage
            index={index}
            createItem={createItem}
            removeSection={removeSection}
            removeItem={removeItem}
            upItem={upItem}
            downItem={downItem}
            updateData={updateData}
            addItem={addItem}
          />
        );
      default:
        return null;
    }
  }, [record, index, setValue, dispatch, cvData, setFocus]);

  return isEnabled && renderSection();
};

export default CvSectionBase;
