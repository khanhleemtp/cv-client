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
      name="Education"
      setting={
        <CvSettingTitle
          add={createItem(append, `${baseName}.${fields?.length}`)}
          remove={removeSection}
        />
      }
    >
      <CvSectionTitle placeholder="Học vấn" name={`sections.${index}.name`} />
      {fields?.map((item, k) => {
        return (
          <CvSectionWrapper
            name={`${baseName}.${k}`}
            key={item._id}
            setting={
              <CvSettingItem
                name={`${baseName}.${k}`}
                add={addItem(insert, `${baseName}.${k + 1}`, k, 'degree')}
                remove={removeItem(k, remove, `${baseName}.${k - 1}`, 'degree')}
                up={upItem(k, move, `${baseName}.${k - 1}`, 'degree')}
                down={downItem(
                  k,
                  move,
                  `${baseName}.${k + 1}`,
                  'degree',
                  fields?.length
                )}
                dayProps={`${baseName}.${k}.dateRange`}
              />
            }
          >
            <CvTypography
              type="h3"
              placeholder="Ngành học"
              name={`${baseName}.${k}.degree`}
              medium
            />
            <CvTypography
              type="p"
              placeholder="Trường Đại học"
              name={`${baseName}.${k}.institution`}
              color="secondary"
              bold
            />
            <div className="flex flex-wrap items-center justify-start">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <div className="flex items-center flex-wrap">
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
                      className="flex-shrink"
                      icon="location"
                    />
                  </div>
                  <div className="flex flex-col w-24 border-l-2">
                    <CvTypography
                      type="h4"
                      className="text-center"
                      placeholder="Loại"
                      name={`${baseName}.${k}.gpaText`}
                    />
                    <div className="inline-flex items-center">
                      <CvTypography
                        type="h4"
                        className="text-center p-0"
                        placeholder="TB"
                        name={`${baseName}.${k}.gpa`}
                      />
                      <span className="mb-0.5">/</span>
                      <CvTypography
                        type="h4"
                        className="text-center p-0"
                        placeholder="Tổng"
                        name={`${baseName}.${k}.maxGpa`}
                      />
                    </div>
                  </div>
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
