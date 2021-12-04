import { useCallback } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateCvStart } from './../../redux/cv/cv.action';

import CvSummary from './CvSummary';
import CvEducation from './CvEducation';

import { selectSectionStart } from './../../redux/viewState/viewState.action';
import CvLanguage from './CvLanguage';
import { CV_SECTION_ITEM_DATA } from './cv.data';
import delayFunc from 'lodash/delay';

const CvSectionBase = ({ record, index }) => {
  const { control, setValue, setFocus, reset } = useFormContext();
  const dispatch = useDispatch();

  const cvData = useWatch({ control });

  const isEnabled = useWatch({
    control,
    name: `sections.${index}.enabled`,
  });

  const renderSection = useCallback(() => {
    // updateData
    const updateData = () => {
      dispatch(updateCvStart({ updateData: cvData, id: cvData.id }));
      reset({}, { keepDirty: false, keepValues: true, keepTouched: true });
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

    const upItem = (k, func, nextPosition, fieldFocus) => {
      if (k === 0) return null;
      return () => {
        func(k, k - 1);
        dispatch(selectSectionStart(nextPosition));
        setFocus(`${nextPosition}.${fieldFocus}`);
      };
    };

    const downItem = (k, func, length, nextPosition, fieldFocus) => {
      if (k === length - 1) return null;
      return () => {
        func(k, k + 1);
        dispatch(selectSectionStart(nextPosition));
        setFocus(`${nextPosition}.${fieldFocus}`);
      };
    };

    const createItem = (func, nextPosition, fieldFocus) => () => {
      func(CV_SECTION_ITEM_DATA[record], {
        focusName: `${nextPosition}.${fieldFocus}`,
      });
      dispatch(selectSectionStart(nextPosition));
      // return updateData();
      delayFunc(updateData, 10);
    };

    const addItem = (func, nextPosition, fieldFocus, index) => () => {
      func(index, CV_SECTION_ITEM_DATA[record], {
        focusName: `${nextPosition}.${fieldFocus}`,
      });
      dispatch(selectSectionStart(nextPosition));
      // dispatch(updateCvStart({ updateData: cvData, id: cvData.id }));

      delayFunc(updateData, 10);

      // updateData();
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
  }, [record, index, setValue, dispatch, cvData, setFocus, reset]);

  return isEnabled && renderSection();
};

export default CvSectionBase;
