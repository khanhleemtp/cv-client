import React from 'react';
import CvSectionWrapper from './CvSectionWrapper';
import CvSectionTitle from './CvSectionTitle';
import { useFormContext, useFieldArray } from 'react-hook-form';
import CvTypography from './CvTypography';
import CvSettingTitle from './Setting/CvSettingTitle';
import CvSettingItem from './Setting/CvSettingItem';
import CvCalendar from './CvCalendar';
import CvBullets from './CvBullets';

const CvEducation = ({
  index,
  createItem,
  removeSection,
  removeItem,
  downItem,
  upItem,
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
      name="Education"
      setting={
        <CvSettingTitle
          add={addItem}
          remove={removeSection}
          dayProps={`sections.${index}.items`}
        />
      }
    >
      <CvSectionTitle placeholder="Education" name={`sections.${index}.name`} />
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
            type="h3"
            placeholder="Ngành học"
            {...register(`sections.${index}.items.${k}.degree`)}
            medium
          />
          <CvTypography
            type="p"
            placeholder="Trường Đại học"
            {...register(`sections.${index}.items.${k}.institution`)}
            color="secondary"
            bold
          />
          <div className="flex flex-wrap md:flex-row-reverse items-center justify-start">
            <div className="flex flex-col w-24">
              <CvTypography
                type="h4"
                className="text-center"
                placeholder="Loại"
                {...register(`sections.${index}.items.${k}.gpaText`)}
              />
              <div className="inline-flex items-center">
                <CvTypography
                  type="h4"
                  className="text-center p-0"
                  placeholder="TB"
                  {...register(`sections.${index}.items.${k}.gpa`)}
                />
                <span className="mb-0.5">/</span>
                <CvTypography
                  type="h4"
                  className="text-center p-0"
                  placeholder="Tong"
                  {...register(`sections.${index}.items.${k}.maxGpa`)}
                />
              </div>
            </div>
            <div className="flex flex-col flex-grow">
              <div className="flex items-center">
                <CvCalendar
                  from={`sections.${index}.items.${k}.dateRange.from`}
                  to={`sections.${index}.items.${k}.dateRange.to`}
                  isOngoing={`sections.${index}.items.${k}.dateRange.isOngoing`}
                />
                <CvTypography
                  type="h4"
                  placeholder="Địa điểm"
                  {...register(`sections.${index}.items.${k}.location`)}
                  icon="location"
                />
              </div>
              <CvBullets
                name={`sections.${index}.items.${k}.bullets`}
                showBullets={`sections.${index}.items.${k}.showBullets`}
              />
            </div>
          </div>
        </CvSectionWrapper>
      ))}
    </CvSectionWrapper>
  );
};

export default CvEducation;
