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
}) => {
  const { register, control } = useFormContext();
  const { move, append, remove, fields } = useFieldArray({
    control,
    name: `sections.${index}.items`,
    keyName: '_id',
  });

  const addItem = createItem({ text: '' }, append);

  return (
    <CvSectionWrapper
      name="language"
      container
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
              remove={removeItem(
                k,
                remove,
                `sections.${index}.items.${k - 1}.text`
              )}
              up={upItem(k, move, `sections.${index}.items.${k - 1}.text`)}
              down={downItem(
                k,
                move,
                fields?.length,
                `sections.${index}.items.${k + 1}.text`
              )}
            />
          }
        >
          <div className="pt-4 pb-2">
            <CvTypography
              placeholder="Kỹ năng"
              medium
              className="mb-0"
              {...register(`sections.${index}.items.${k}.name`)}
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
