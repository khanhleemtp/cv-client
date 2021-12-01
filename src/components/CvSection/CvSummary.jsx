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
  updateData,
}) => {
  const { register, control } = useFormContext();
  console.log(index);
  const { move, append, remove, fields } = useFieldArray({
    control,
    name: `sections.${index}.items`,
    keyName: '_id',
  });

  const addItem = createItem({ text: '' }, append);

  return (
    <CvSectionWrapper
      name="summay"
      setting={<CvSettingTitle add={addItem} remove={removeSection} />}
    >
      <CvSectionTitle placeholder="Summary" name={`sections.${index}.name`} />
      {fields?.map((item, k) => (
        <CvSectionWrapper
          name={`sections.${index}.items.${k}.text`}
          key={item._id}
          setting={
            <CvSettingItem
              add={addItem}
              remove={removeItem(k, remove)}
              up={upItem(k, move, `sections.${index}.items.${k - 1}.text`)}
              down={downItem(
                k,
                move,
                fields?.length,
                `sections.${index}.items.${k + 1}.text`
              )}
              calendar={() => {}}
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
