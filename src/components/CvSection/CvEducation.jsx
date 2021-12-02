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
  const { move, append, remove, fields } = useFieldArray({
    control,
    name: `sections.${index}.items`,
    keyName: '_id',
  });

  const addItem = createItem(
    {
      degree: '',
      dateRange: {
        from: null,
        isOngoing: false,
        to: null,
      },
      bullets: [
        {
          text: '',
        },
      ],
      institution: '',
      location: '',
      gpaText: '',
      gpa: '',
      maxGpa: '',
      showBullets: true,
      showLocation: true,
      showGpa: true,
      showDateRange: true,
    },
    append
  );

  return (
    <CvSectionWrapper
      container
      name="Education"
      setting={<CvSettingTitle add={addItem} remove={removeSection} />}
    >
      <CvSectionTitle placeholder="Education" name={`sections.${index}.name`} />
      {fields?.map((item, k) => (
        <CvSectionWrapper
          name={`sections.${index}.items.${k}`}
          key={item._id}
          setting={
            <CvSettingItem
              add={addItem}
              remove={removeItem(
                k,
                remove,
                `sections.${index}.items.${k - 1}.degree`
              )}
              up={upItem(k, move, `sections.${index}.items.${k - 1}`)}
              down={downItem(
                k,
                move,
                fields?.length,
                `sections.${index}.items.${k + 1}`
              )}
              dayProps={`sections.${index}.items.${k}.dateRange`}
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
                  placeholder="Tổng"
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
                  dayProps={`sections.${index}.items.${k}.dateRange`}
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
