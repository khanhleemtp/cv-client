import CvSummary from './CvSummary';
import CvEducation from './CvEducation';
import CvLanguage from './CvLanguage';
import CvExperience from './CvExperience';
import CvSkills from './CvSkills';

import { has } from 'lodash-es';
import { StyleSheet, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
});
const Base = ({ child: Child, ...otherProps }) => (
  <View style={styles.container}>
    <Child {...otherProps} />
  </View>
);

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
