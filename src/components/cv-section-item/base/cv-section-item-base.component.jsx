import { useMemo, useCallback } from 'react';
import CvWrapper from '../common/wrapper/cv-wrapper.component';
import CvSettingSectionItem from '../setting/cv-setting-section-item.component';
import CvEducation from '../education/cv-education.component';
import CvExperience from '../experience/cv-experience.component';
import CvLanguage from './../other-skill/cv-other-skill.component';
import CvSummary from '../summary/cv-summary.component';
import CvTechnology from '../technology/cv-technology.component';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { setFields } from '../../../redux/viewState/viewState.action';
import { updateCvStart } from './../../../redux/cv/cv.action';
import { connect } from 'react-redux';
import CvListSwitch from '../popover/cv-list-switch.component';
import CvDatepicker from './../common/date-picker/cv-date-picker.component';

const CvSectionItemBase = ({
  section,
  item,
  record,
  addItem,
  removeItem,
  upItem,
  downItem,
  updateCv,
  setInput,
}) => {
  // ui
  // field

  const SectionComponent = useMemo(() => {
    switch (record) {
      case 'SummarySection':
        return CvSummary;
      case 'TechnologySection':
        return CvTechnology;
      case 'EducationSection':
        return CvEducation;
      case 'ExperienceSection':
        return CvExperience;
      case 'LanguageSection':
        return CvLanguage;
      default:
        return null;
    }
  }, [record]);

  const baseSetting = [
    { icon: 'addItem', onClick: addItem },
    { icon: 'removeItem', onClick: removeItem },
    { icon: 'up', onClick: upItem },
    { icon: 'down', onClick: downItem },
  ];

  const { control, getValues } = useFormContext();

  const { append, remove, fields, insert } = useFieldArray({
    control,
    name: `sections.${section}.items.${item}.tags`,
  });

  const addTag = useCallback(() => {
    append({ text: '' });
    setInput(
      section,
      item,
      `sections.${section}.items.${item}.tags.${fields.length}.text`
    );
    const cvData = getValues();
    updateCv({ id: cvData?.id, updateData: cvData });
  }, [append, fields, setInput, item, section, updateCv, getValues]);

  const removeTag = useCallback(() => {
    if (fields?.length === 1) return;
    remove(fields?.length - 1);
    setInput(
      section,
      item,
      `sections.${section}.items.${item}.tags.${fields.length - 2}.text`
    );
    // setFocus(
    //   `sections.${section}.items.${item}.tags.${fields.length - 2}.text`
    // );
    const cvData = getValues();
    updateCv({ id: cvData?.id, updateData: cvData });
  }, [remove, fields, setInput, item, section, updateCv, getValues]);

  const otherSetting = useMemo(() => {
    switch (record) {
      case 'TechnologySection':
        return [
          {
            icon: 'addTag',
            onClick: addTag,
          },
          {
            icon: 'removeTag',
            onClick: removeTag,
          },
        ];
      case 'ExperienceSection':
      case 'EducationSection':
        return [
          {
            icon: 'calendar',
            popover: `sections.${section}.items.${item}.dateRange`,
            component: (
              <CvDatepicker
                dayProps={`sections.${section}.items.${item}.dateRange`}
              />
            ),
          },
        ];
      default:
        return [];
    }
  }, [record, addTag, removeTag, item, section]);

  const listConfig = useMemo(() => {
    const base = `sections.${section}.items.${item}.`;
    switch (record) {
      case 'TechnologySection':
        return [
          {
            name: base + 'showTitle',
            label: 'Kỹ năng',
          },
        ];
      case 'ExperienceSection':
        return [
          {
            name: base + 'showTitle',
            label: 'Công việc',
          },
          {
            name: base + 'showCompany',
            label: 'Công ty',
          },
          {
            name: base + 'showLocation',
            label: 'Địa điểm',
          },
          {
            name: base + 'showDescription',
            label: 'Mô tả',
          },
          {
            name: base + 'showLink',
            label: 'Link',
          },
          {
            name: base + 'showDateRange',
            label: 'Thời gian',
          },
          {
            name: base + 'showBullets',
            label: 'Chi tiết',
          },
        ];
      case 'EducationSection':
        return [
          {
            name: base + 'showGpa',
            label: 'Gpa',
          },
          {
            name: base + 'showLocation',
            label: 'Địa điểm',
          },
          {
            name: base + 'showDateRange',
            label: 'Thời gian',
          },
          {
            name: base + 'showBullets',
            label: 'Thông tin thêm',
          },
        ];
      default:
        return [];
    }
  }, [record, item, section]);

  return (
    <CvWrapper
      item={item}
      section={section}
      setting={
        <CvSettingSectionItem
          list={[
            ...baseSetting,
            ...otherSetting,
            {
              icon: 'config',
              popover: `sections.${section}.items.${item}`,
              component: <CvListSwitch list={listConfig} />,
              list: listConfig,
            },
          ]}
        />
      }
    >
      <SectionComponent
        item={item}
        section={section}
        name={`sections.${section}.items.${item}`}
        fields={fields}
        remove={remove}
        insert={insert}
      />
    </CvWrapper>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setInput: (section, item, field) => {
    console.log('run here cv-section-item base');
    dispatch(setFields({ section, item, field }));
  },
  updateCv: (data) => dispatch(updateCvStart(data)),
});

export default connect(null, mapDispatchToProps)(CvSectionItemBase);
