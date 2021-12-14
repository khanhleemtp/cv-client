import CvSummary from './CvSummary';
import CvEducation from './CvEducation';
import CvLanguage from './CvLanguage';
import CvExperience from './CvExperience';
import CvSkills from './CvSkills';

import { has } from 'lodash-es';

const Base = ({ child: Child, ...otherProps }) => <Child {...otherProps} />;

const CV_SECTION_COMPONENT = {
  SummarySection: CvSummary,
  EducationSection: CvEducation,
  LanguageSection: CvLanguage,
  ExperienceSection: CvExperience,
  TechnologySection: CvSkills,
};

const CvPdfSection = ({ section }) => {
  if (has(CV_SECTION_COMPONENT, section?.record) && section?.enabled) {
    return (
      <Base child={CV_SECTION_COMPONENT[section?.record]} data={section} />
    );
  }
  return null;
};

export default CvPdfSection;
