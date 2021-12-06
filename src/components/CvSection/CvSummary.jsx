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
          add={createItem(
            append,
            `sections.${index}.items.${fields?.length}`,
            'text'
          )}
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
              add={addItem(
                insert,
                `sections.${index}.items.${k + 1}`,
                'text',
                k + 1
              )}
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
                fields?.length,
                `sections.${index}.items.${k + 1}`,
                'text'
              )}
              isHiddenUp={k === 0}
              isHiddenDown={k === fields?.length - 1}
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
