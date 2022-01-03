import React from 'react';
import CvSectionWrapper from './CvSectionWrapper';
import CvSectionTitle from './CvSectionTitle';
import { useFormContext, useFieldArray } from 'react-hook-form';
import CvTypography from './CvTypography';
import CvSettingTitle from './Setting/CvSettingTitle';
import CvSettingItem from './Setting/CvSettingItem';
import CvSlider from './CvSlider';

const CvLanguage = ({
  index,
  createItem,
  removeSection,
  removeItem,
  downItem,
  upItem,
  addItem,
}) => {
  const { control } = useFormContext();
  const { move, append, remove, fields, insert } = useFieldArray({
    control,
    name: `sections.${index}.items`,
    keyName: '_id',
  });

  return (
    <CvSectionWrapper
      name="language"
      container
      setting={
        <CvSettingTitle
          add={createItem(append, `sections.${index}.items.${fields?.length}`)}
          remove={removeSection}
        />
      }
    >
      <CvSectionTitle placeholder="Summary" name={`sections.${index}.name`} />
      {fields?.map((item, k) => (
        <CvSectionWrapper
          name={`sections.${index}.items.${k}`}
          key={item._id}
          setting={
            <CvSettingItem
              add={addItem(
                insert,
                `sections.${index}.items.${k + 1}`,
                k,
                'name'
              )}
              remove={removeItem(
                k,
                remove,
                `sections.${index}.items.${k - 1}`,
                'name'
              )}
              up={upItem(k, move, `sections.${index}.items.${k - 1}`, 'name')}
              down={downItem(
                k,
                move,
                `sections.${index}.items.${k + 1}`,
                'name',
                fields?.length
              )}
            />
          }
        >
          <div className="">
            <CvTypography
              placeholder="Kỹ năng"
              medium
              className="mb-0"
              name={`sections.${index}.items.${k}.name`}
            />
            <CvSlider
              name={`sections.${index}.items.${k}.level`}
              placeholder="Kỹ năng khác"
            />
          </div>
        </CvSectionWrapper>
      ))}
    </CvSectionWrapper>
  );
};

export default CvLanguage;