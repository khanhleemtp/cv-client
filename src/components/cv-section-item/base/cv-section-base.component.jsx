import { useMemo } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { connect } from 'react-redux';

import { PencilIcon } from '@heroicons/react/solid';

import clsx from 'clsx';

import CvTypography from '../common/typography/cv-typography';
import CvSettingTitle from '../setting/cv-setting-title.component';
import CvWrapper from '../common/wrapper/cv-wrapper.component';
import CvSectionItemBase from './cv-section-item-base.component';

import { CV_SECTION_ITEM_DATA } from './cv.data';

import { openModal } from '../../../redux/viewState/viewState.action';
import { updateCvStart } from '../../../redux/cv/cv.action';
import { setFields } from './../../../redux/viewState/viewState.action';
import { selectCurrentSection } from '../../../redux/viewState/viewState.selectors';

// update, record, move

const CvSectionBase = ({
  section,
  dragCvModal,
  updateCv,
  record,
  setInput,
  isSelectedContainer,
}) => {
  const field = useMemo(() => {
    switch (record) {
      case 'SummarySection':
        return 'text';
      case 'TechnologySection':
        return 'title';
      case 'EducationSection':
        return 'degree';
      case 'ExperienceSection':
        return 'position';
      case 'LanguageSection':
        return 'name';
      default:
        return null;
    }
  }, [record]);

  const { control, getValues, setValue, setFocus } = useFormContext();

  const baseName = `sections.${section}.items`;

  const { append, insert, remove, fields, move } = useFieldArray({
    control,
    name: baseName,
    keyName: '_id',
  });

  const isEnabled = useWatch({
    control,
    name: `sections.${section}.enabled`,
  });

  const updateData = () => {
    const cvData = getValues();
    updateCv({ updateData: cvData, id: cvData.id });
  };

  const removeSection = () => {
    setValue(`sections.${section}.enabled`, false);
    updateData();
  };

  const createItem = () => {
    append(CV_SECTION_ITEM_DATA[record]);
    const length = fields?.length;
    setInput(section, length, `sections.${section}.items.${length}.${field}`);
    updateData();
  };

  const removeItem = (index) => () => {
    if (index === 0) return;
    remove(index);
    const focusName = `sections.${section}.items.${index - 1}.${field}`;
    setFocus(focusName);
    setInput(section, index - 1, focusName);
    updateData();
  };

  const upItem = (index) => {
    if (index === 0) return null;
    return () => {
      move(index, index - 1);
      // dispatch(selectSectionStart(nextPosition));
      const focusName = `sections.${section}.items.${index - 1}.${field}`;
      setFocus(focusName);
      updateData();
      setInput(section, index - 1, focusName);
    };
  };

  const downItem = (index) => {
    if (index === fields?.length - 1) return null;
    return () => {
      move(index, index + 1);
      // dispatch(selectSectionStart(nextPosition));
      const focusName = `sections.${section}.items.${index + 1}.${field}`;
      setFocus(focusName);
      updateData();
      setInput(section, index + 1, focusName);
    };
  };

  const addItem = (index) => () => {
    const focusName = `sections.${section}.items.${index + 1}.${field}`;
    insert(index + 1, CV_SECTION_ITEM_DATA[record], {
      focusIndex: index + 1,
    });
    setInput(section, index + 1, focusName);
    updateData();
  };

  return (
    <CvWrapper
      isEnabled={isEnabled}
      container={true}
      section={section}
      setting={
        <CvSettingTitle
          dragCvModal={dragCvModal}
          remove={removeSection}
          add={createItem}
        />
      }
    >
      <div
        className={clsx(
          'flex items-center w-full border-b-2 border-gray-300 mb-2',
          {
            'hover:ring-1': !isSelectedContainer,
          }
        )}
      >
        <PencilIcon className="w-8 h-8 text-blue-500 md:hidden" />
        <CvTypography
          type="h1"
          bold
          color="secondary"
          className="uppercase"
          section={section}
          name={`sections.${section}.name`}
          record={record}
        />
      </div>
      {fields.map((item, index) => {
        return (
          <CvSectionItemBase
            key={item._id}
            section={section}
            item={index}
            data={item}
            record={record}
            addItem={addItem(index)}
            removeItem={removeItem(index)}
            upItem={upItem(index)}
            downItem={downItem(index)}
          />
        );
      })}
    </CvWrapper>
  );
};

const mapStateToProps = (state, ownProps) => ({
  isSelectedContainer: selectCurrentSection(ownProps?.section)(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  dragCvModal: () =>
    dispatch(
      openModal('SECTION_CV', {
        title: 'Thay ?????i th??? t???',
        type: 'DRAG',
        move: ownProps?.move,
        update: ownProps?.update,
      })
    ),
  setInput: (section, item, field) => {
    console.log(section, item, field);
    dispatch(setFields({ section, item, field, popver: null }));
  },
  updateCv: (data) => dispatch(updateCvStart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CvSectionBase);
