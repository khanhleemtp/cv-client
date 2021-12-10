import React from 'react';
import CvSectionWrapper from './CvSectionWrapper';
import CvSectionTitle from './CvSectionTitle';
import { useFormContext, useFieldArray } from 'react-hook-form';
import CvTypography from './CvTypography';
import CvSettingTitle from './Setting/CvSettingTitle';
import CvSettingItem from './Setting/CvSettingItem';
import CvCalendar from './CvCalendar';
import CvBullets from './CvBullets';

const CvExperience = ({
  index,
  createItem,
  removeSection,
  removeItem,
  downItem,
  upItem,
  addItem,
}) => {
  const { control } = useFormContext();

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
      <CvSectionTitle
        placeholder="Kinh nghiệm"
        name={`sections.${index}.name`}
      />
      {fields?.map((item, k) => {
        return (
          <CvSectionWrapper
            name={`${baseName}.${k}`}
            key={item._id}
            setting={
              <CvSettingItem
                add={addItem(insert, `${baseName}.${k + 1}`, k, 'position')}
                remove={removeItem(
                  k,
                  remove,
                  `${baseName}.${k - 1}`,
                  'position'
                )}
                up={upItem(k, move, `${baseName}.${k - 1}`, 'position')}
                down={downItem(
                  k,
                  move,
                  `${baseName}.${k + 1}`,
                  'position',
                  fields?.length
                )}
                dayProps={`${baseName}.${k}.dateRange`}
              />
            }
          >
            <CvTypography
              type="h3"
              placeholder="Vị trí"
              name={`${baseName}.${k}.position`}
              medium
            />
            <CvTypography
              type="p"
              placeholder="Nơi làm việc"
              name={`${baseName}.${k}.workplace`}
              color="secondary"
              bold
            />
            <div className="flex flex-wrap md:flex-row-reverse items-center justify-start">
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
                    name={`${baseName}.${k}.location`}
                    icon="location"
                  />
                </div>
                <CvTypography
                  type="p"
                  placeholder="Mô tả công việc"
                  name={`${baseName}.${k}.description`}
                />
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

export default CvExperience;
