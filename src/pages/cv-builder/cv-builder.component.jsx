import NavContainer from '../../components/nav-container/nav-container.component';

import CvTitle from '../../components/CvSection/CvTitle';
import CvContainer from '../../components/CvSection/CvContainer';
import CvProfile from '../../components/CvSection/CvProfile';
import ToolboxContainer from '../../components/Toolbox/ToolboxContainer';
import CvSectionWrapper from './../../components/CvSection/CvSectionWrapper';
import CvSummary from '../../components/CvSection/CvSummary';

const CvBuilderPage = () => {
  return (
    <NavContainer>
      <ToolboxContainer />
      <CvContainer>
        <CvTitle onClick={() => console.log('click z-index 0')} />
        <CvSectionWrapper name="profile">
          <CvProfile />
        </CvSectionWrapper>
        <CvSectionWrapper name="summary">
          <CvSummary />
        </CvSectionWrapper>
      </CvContainer>
    </NavContainer>
  );
};

export default CvBuilderPage;
