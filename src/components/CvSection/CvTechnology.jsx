import CvSectionWrapper from './CvSectionWrapper';
import CvSectionTitle from './CvSectionTitle';
import { useFormContext, useFieldArray } from 'react-hook-form';
import CvSettingTitle from './Setting/CvSettingTitle';
import CvTags from './CvTags';


const CvTechnology = ({
  index,
  createItem,
  removeSection,
  removeItem,
  downItem,
  upItem,
  updateData,
  addItem,
}) => {
  const { control } = useFormContext();

  const baseName = `sections.${index}.items`;

  const { move, append, insert, remove, fields } = useFieldArray({
    control,
    name: baseName,
    keyName: '_id',
  });

  // const tech = useWatch({ name: baseName, control });

  // const addTag = (k) => () => {
  //   update(k, {
  //     title: tech[k].name,
  //     tags: concat(tech[k].tags, { text: '' }),
  //   });
  //   updateData();

  //   delay(
  //     () => setFocus(`${baseName}.${k}.tags.${tech[k].tags.length}.text`),
  //     10
  //   );
  // };

  // const removeTag = (k) => {
  //   if (tech[k]?.tags?.length === 1) return null;
  //   return () => {
  //     update(k, {
  //       title: tech[k].name,
  //       tags: dropRight(tech[k].tags),
  //     });
  //     updateData();
  //     delay(
  //       () => setFocus(`${baseName}.${k}.tags.${tech[k].tags.length - 2}.text`),
  //       10
  //     );
  //   };
  // };

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
          <CvTags
            key={item._id}
            name={`${baseName}.${k}`}
            updateData={updateData}
            addItem={addItem(insert, `${baseName}.${k + 1}`, k, 'title')}
            removeItem={removeItem(
              k,
              remove,
              `${baseName}.${k - 1}`,
              'tags.0.text'
            )}
            upItem={upItem(k, move, `${baseName}.${k - 1}`, 'tags.0.text')}
            downItem={downItem(
              k,
              move,
              `${baseName}.${k + 1}`,
              'tags.0.text',
              fields?.length
            )}
          />
        );
      })}
    </CvSectionWrapper>
  );
};

export default CvTechnology;
