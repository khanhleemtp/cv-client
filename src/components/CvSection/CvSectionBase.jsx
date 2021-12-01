import { useCallback } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateCvStart } from './../../redux/cv/cv.action';

import CvSummary from './CvSummary';
import { selectSectionStart } from './../../redux/viewState/viewState.action';

const CvSectionBase = ({ record, index }) => {
  const { control, setValue, setFocus } = useFormContext();
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
    };

    const removeSection = () => {
      setValue(`sections.${index}.enabled`, false);
      updateData();
    };

    const removeItem = (index, func) => () => {
      func(index);
      // updateData();
    };

    const upItem = (k, func, nextPostion) => {
      if (k === 0) return null;
      return () => {
        func(k, k - 1);
        dispatch(selectSectionStart(nextPostion));
        setFocus(nextPostion);
      };
    };

    const downItem = (k, func, length, nextPostion) => {
      if (k === length - 1) return null;
      return () => {
        func(k, k + 1);
        dispatch(selectSectionStart(nextPostion));
        setFocus(nextPostion);
      };
    };

    const createItem = (data, func) => () => {
      func(data);
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
          />
        );
      default:
        return null;
    }
  }, [record, index, setValue, dispatch, cvData, setFocus]);

  return isEnabled && renderSection();
};

export default CvSectionBase;
