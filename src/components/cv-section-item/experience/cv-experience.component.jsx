import CvCalendar from '../common/calendar/cv-calendar.component';
import CvTypography from './../common/typography/cv-typography';
import CvBullets from './../common/bullets/cv-bullets.component';

const CvExperience = ({ name, item, section }) => {
  return (
    <>
      <CvTypography
        type="h3"
        placeholder="Vị trí"
        name={`${name}.position`}
        isEnabled={`${name}.showTitle`}
        medium
        item={item}
        section={section}
      />
      <CvTypography
        type="p"
        placeholder="Nơi làm việc"
        name={`${name}.workplace`}
        isEnabled={`${name}.showCompany`}
        color="secondary"
        item={item}
        section={section}
        bold
      />
      <div className="flex flex-wrap md:flex-row-reverse items-center justify-start">
        <div className="flex flex-col flex-grow">
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
              icon="location"
              isEnabled={`${name}.showLocation`}
              item={item}
              section={section}
            />
          </div>
          <CvTypography
            type="p"
            placeholder="Mô tả công việc"
            name={`${name}.description`}
            item={item}
            isEnabled={`${name}.showDescription`}
            section={section}
          />
          <CvBullets
            name={`${name}.bullets`}
            showBullets={`${name}.showBullets`}
            item={item}
            section={section}
          />
        </div>
      </div>
    </>
  );
};

export default CvExperience;
