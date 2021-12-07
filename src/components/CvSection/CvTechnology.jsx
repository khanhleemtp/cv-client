import React from 'react';
import CvSectionWrapper from './CvSectionWrapper';
import CvSectionTitle from './CvSectionTitle';
import { useFormContext, useFieldArray } from 'react-hook-form';
import CvTypography from './CvTypography';
import CvSettingTitle from './Setting/CvSettingTitle';
import CvSettingItem from './Setting/CvSettingItem';
import CvTags from './CvTags';

const CvTechnology = ({
  index,
  createItem,
  removeSection,
  removeItem,
  downItem,
  upItem,
  addItem,
}) => {
  const { register, control } = useFormContext();

  const baseName = `sections.${index}.items`;

  const { move, append, insert, remove, fields } = useFieldArray({
    control,
    name: baseName,
    keyName: '_id',
  });

  return (
    <CvSectionWrapper
      container
      name="Experience"
      setting={
        <CvSettingTitle
          add={createItem(append, `${baseName}.${fields?.length}`)}
          remove={removeSection}
        />
      }
    >
      <CvSectionTitle placeholder="Kỹ năng" name={`sections.${index}.name`} />
      {fields?.map((item, k) => {
        return (
          <CvSectionWrapper
            name={`${baseName}.${k}`}
            key={item._id}
            setting={
              <CvSettingItem
                add={addItem(insert, `${baseName}.${k + 1}`, k + 1)}
                remove={removeItem(
                  k,
                  remove,
                  `${baseName}.${k - 1}`,
                  'tags.0.text'
                )}
                up={upItem(k, move, `${baseName}.${k - 1}`, 'tags.0.text')}
                down={downItem(k, move, `${baseName}.${k + 1}`, 'tags.0.text')}
                index={k}
                length={fields?.length}
              />
            }
          >
            <CvTypography
              type="p"
              placeholder="Nhóm kỹ năng"
              {...register(`${baseName}.${k}.title`)}
              color="secondary"
              bold
            />

            <CvTags name={`${baseName}.${k}.tags`} />
          </CvSectionWrapper>
        );
      })}
    </CvSectionWrapper>
  );
};

export default CvTechnology;
