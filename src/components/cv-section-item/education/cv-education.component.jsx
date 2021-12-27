import CvCalendar from '../common/calendar/cv-calendar.component';
import CvTypography from './../common/typography/cv-typography';
import CvBullets from './../common/bullets/cv-bullets.component';
import { useFormContext, useWatch } from 'react-hook-form';

const CvEducation = ({ name, item, section }) => {
  const { control } = useFormContext();

  const showGpa = useWatch({ control, name: `${name}.showGpa` });

  return (
    <div>
      <CvTypography
        type="h3"
        placeholder="Ngành học"
        name={`${name}.degree`}
        item={item}
        section={section}
        medium
      />
      <CvTypography
        type="p"
        placeholder="Trường Đại học"
        name={`${name}.institution`}
        color="secondary"
        item={item}
        section={section}
        bold
      />
      <div className="flex flex-wrap items-center justify-start">
        <div className="flex flex-col">
          <div className="flex items-center">
            <div className="flex items-center flex-wrap">
              <CvCalendar
                from={`${name}.dateRange.from`}
                to={`${name}.dateRange.to`}
                isOngoing={`${name}.dateRange.isOngoing`}
                dayProps={`${name}.dateRange`}
                isEnabled={`${name}.showDateRange`}
                item={item}
                section={section}
              />

              <CvTypography
                type="h4"
                placeholder="Địa điểm"
                name={`${name}.location`}
                className="flex-shrink"
                icon="location"
                item={item}
                section={section}
                isEnabled={`${name}.showLocation`}
              />
            </div>
            {showGpa && (
              <div className="flex flex-col w-24 border-l-2">
                <CvTypography
                  type="h4"
                  className="text-center"
                  placeholder="Loại"
                  name={`${name}.gpaText`}
                  item={item}
                  section={section}
                />
                <div className="inline-flex items-center">
                  <CvTypography
                    type="h4"
                    className="text-center p-0"
                    placeholder="TB"
                    name={`${name}.gpa`}
                    item={item}
                    section={section}
                  />
                  <span className="mb-0.5">/</span>
                  <CvTypography
                    type="h4"
                    className="text-center p-0"
                    placeholder="Tổng"
                    name={`${name}.maxGpa`}
                    item={item}
                    section={section}
                  />
                </div>
              </div>
            )}
          </div>
          <CvBullets
            name={`${name}.bullets`}
            item={item}
            section={section}
            showBullets={`${name}.showBullets`}
          />
        </div>
      </div>
    </div>
  );
};

export default CvEducation;
