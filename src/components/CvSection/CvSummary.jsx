import React from 'react';
import CvSectionWrapper from './CvSectionWrapper';
import CvSectionTitle from './CvSectionTitle';
import { useFormContext, useFieldArray } from 'react-hook-form';
import CvTypography from './CvTypography';
import CvSettingTitle from './Setting/CvSettingTitle';
import CvSettingItem from './Setting/CvSettingItem';

const CvSummary = ({
  index,
  createItem,
  removeSection,
  removeItem,
  downItem,
  upItem,
  addItem,
}) => {
  const { register, control } = useFormContext();
  const { move, append, remove, fields, insert } = useFieldArray({
    control,
    name: `sections.${index}.items`,
    keyName: '_id',
  });

  return (
    <CvSectionWrapper
      name="summay"
      setting={
        <CvSettingTitle
          add={createItem(append, `sections.${index}.items.${fields?.length}`)}
          remove={removeSection}
        />
      }
      container
    >
      <CvSectionTitle placeholder="Summary" name={`sections.${index}.name`} />
      {fields?.map((item, k) => (
        <CvSectionWrapper
          name={`sections.${index}.items.${k}`}
          key={item._id}
          setting={
            <CvSettingItem
              add={addItem(insert, `sections.${index}.items.${k + 1}`, k + 1)}
              remove={removeItem(
                k,
                remove,
                `sections.${index}.items.${k - 1}`,
                `text`
              )}
              up={upItem(k, move, `sections.${index}.items.${k - 1}`, 'text')}
              down={downItem(
                k,
                move,
                `sections.${index}.items.${k + 1}`,
                'text'
              )}
              index={k}
              length={fields?.length}
            />
          }
        >
          <CvTypography
            type="p"
            placeholder="Thông tin thêm"
            {...register(`sections.${index}.items.${k}.text`)}
          />
        </CvSectionWrapper>
      ))}
    </CvSectionWrapper>
  );
};

export default CvSummary;
