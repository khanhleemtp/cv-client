import CvEducation from './CvEducation';
import CvSectionWrapper from './CvSectionWrapper';
import CvSummary from './CvSummary';
import CvSettingEducation from './Setting/Education/CvSettingEducation';
import CvSettingSummay from './Setting/Summary/CvSettingSummay';

const CvSectionBase = ({ record }) => {
  return (
    <CvSectionWrapper
      name={record}
      setting={CvSettingSummay}
      // important to include key with field's id
    >
      <CvSummary />
    </CvSectionWrapper>
  );
};

export default CvSectionBase;
