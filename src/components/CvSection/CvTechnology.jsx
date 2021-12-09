import { useCallback } from 'react';
import CvSectionWrapper from './CvSectionWrapper';
import CvSectionTitle from './CvSectionTitle';
import { useFormContext, useFieldArray, useWatch } from 'react-hook-form';
import CvTypography from './CvTypography';
import CvSettingTitle from './Setting/CvSettingTitle';
import CvSettingItem from './Setting/CvSettingItem';
import CvTags from './CvTags';
import { concat, dropRight, delay } from 'lodash-es';

const CvTechnology = ({
  index,
  createItem,
  removeSection,
  removeItem,
  downItem,
  upItem,
  addItem,
}) => {
  const { register, control, setFocus } = useFormContext();

  const baseName = `sections.${index}.items`;

  const { move, append, insert, remove, fields, update } = useFieldArray({
    control,
    name: baseName,
    keyName: '_id',
  });

  const tech = useWatch({ name: baseName, control });

  const addTag = useCallback(
    (k) => () => {
      update(k, {
        title: tech[k].name,
        tags: concat(tech[k].tags, { text: ' ' }),
      });
      delay(
        () => setFocus(`${baseName}.${k}.tags.${tech[k].tags.length}.text`),
        10
      );
    },
    [baseName, setFocus, tech, update]
  );

  const removeTag = (k) => {
    if (tech[k]?.tags?.length === 1) return false;
    return () => {
      update(k, {
        title: tech[k].name,
        tags: dropRight(tech[k].tags),
      });
      delay(
        () => setFocus(`${baseName}.${k}.tags.${tech[k].tags.length - 2}.text`),
        10
      );
    };
  };

  return (
    <CvSectionWrapper
      container
      name="Technology"
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
                add={addItem(insert, `${baseName}.${k + 1}`, k, 'title')}
                remove={removeItem(
                  k,
                  remove,
                  `${baseName}.${k - 1}`,
                  'tags.0.text'
                )}
                up={upItem(k, move, `${baseName}.${k - 1}`, 'tags.0.text')}
                down={downItem(
                  k,
                  move,
                  `${baseName}.${k + 1}`,
                  'tags.0.text',
                  fields?.length
                )}
                addTag={addTag(k)}
                removeTag={removeTag(k)}
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
