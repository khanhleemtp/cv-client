import NavContainer from '../../components/nav-container/nav-container.component';

import CvTitle from '../../components/CvSection/CvTitle';
import CvContainer from '../../components/CvSection/CvContainer';
import CvProfile from '../../components/CvSection/CvProfile';
import ToolboxContainer from '../../components/Toolbox/ToolboxContainer';
import CvSectionWrapper from './../../components/CvSection/CvSectionWrapper';

const CvBuilderPage = () => {
  return (
    <NavContainer>
      <ToolboxContainer />
      <CvContainer>
        <CvTitle onClick={() => console.log('click z-index 0')} />
        <CvSectionWrapper name="profile">
          <CvProfile />
        </CvSectionWrapper>

        <CvSectionWrapper name="test">
          <div onClick={() => console.log('click z-15')}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea cumque
            dignissimos architecto assumenda nobis sit, laboriosam error quod
            aspernatur cupiditate amet eaque hic corporis doloremque molestias a
            accusamus minus maxime.
          </div>
        </CvSectionWrapper>
      </CvContainer>
    </NavContainer>
  );
};

export default CvBuilderPage;
