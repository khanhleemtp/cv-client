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
      name="Education"
      setting={
        <CvSettingTitle
          add={createItem(append, `${baseName}.${fields?.length}`, 'degree')}
          remove={removeSection}
        />
      }
    >
      <CvSectionTitle placeholder="Education" name={`sections.${index}.name`} />
      {fields?.map((item, k) => {
        return (
          <CvSectionWrapper
            name={`${baseName}.${k}`}
            key={item._id}
            setting={
              <CvSettingItem
                add={addItem(insert, `${baseName}.${k + 1}`, `degree`, k + 1)}
                remove={removeItem(k, remove, `${baseName}.${k - 1}`, 'degree')}
                up={upItem(k, move, `${baseName}.${k - 1}`, 'degree')}
                down={downItem(
                  k,
                  move,
                  fields?.length,
                  `${baseName}.${k + 1}`,
                  'degree'
                )}
                dayProps={`${baseName}.${k}.dateRange`}
              />
            }
          >
            <CvTypography
              type="h3"
              placeholder="Ngành học"
              {...register(`${baseName}.${k}.degree`)}
              medium
            />
            <CvTypography
              type="p"
              placeholder="Trường Đại học"
              {...register(`${baseName}.${k}.institution`)}
              color="secondary"
              bold
            />
            <div className="flex flex-wrap md:flex-row-reverse items-center justify-start">
              <div className="flex flex-col w-24">
                <CvTypography
                  type="h4"
                  className="text-center"
                  placeholder="Loại"
                  {...register(`${baseName}.${k}.gpaText`)}
                />
                <div className="inline-flex items-center">
                  <CvTypography
                    type="h4"
                    className="text-center p-0"
                    placeholder="TB"
                    {...register(`${baseName}.${k}.gpa`)}
                  />
                  <span className="mb-0.5">/</span>
                  <CvTypography
                    type="h4"
                    className="text-center p-0"
                    placeholder="Tổng"
                    {...register(`${baseName}.${k}.maxGpa`)}
                  />
                </div>
              </div>
              <div className="flex flex-col flex-grow">
                <div className="flex items-center">
                  <CvCalendar
                    from={`${baseName}.${k}.dateRange.from`}
                    to={`${baseName}.${k}.dateRange.to`}
                    isOngoing={`${baseName}.${k}.dateRange.isOngoing`}
                    dayProps={`${baseName}.${k}.dateRange`}
                  />
                  <CvTypography
                    type="h4"
                    placeholder="Địa điểm"
                    {...register(`${baseName}.${k}.location`)}
                    icon="location"
                  />
                </div>
                <CvBullets
                  name={`${baseName}.${k}.bullets`}
                  showBullets={`${baseName}.${k}.showBullets`}
                />
              </div>
            </div>
          </CvSectionWrapper>
        );
      })}
    </CvSectionWrapper>
  );
};

export default CvEducation;
