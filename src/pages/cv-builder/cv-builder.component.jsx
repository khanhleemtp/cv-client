import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NavContainer from '../../components/nav-container/nav-container.component';
import CvTitle from '../../components/CvSection/CvTitle';
import CvContainer from '../../components/CvSection/CvContainer';
import CvProfile from '../../components/CvSection/CvProfile';
import ToolboxContainer from '../../components/Toolbox/ToolboxContainer';
import CvSectionWrapper from './../../components/CvSection/CvSectionWrapper';
import CvSummary from '../../components/CvSection/CvSummary';
import CvSettingProfile from '../../components/CvSection/Setting/Profile/CvSettingProfile';
import CvSettingSummay from './../../components/CvSection/Setting/Summary/CvSettingSummay';
import CvEducation from '../../components/CvSection/CvEducation';
import CvSettingEducation from './../../components/CvSection/Setting/Education/CvSettingEducation';
import { loadCvStart } from '../../redux/cv/cv.action';

const CvBuilderPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCvStart('619ff2dd3f5cd425c0e24dd4'));
    return () => {};
  }, [dispatch]);

  // const methods = useForm({
  //   defaultValues: cvData,
  // });
  // useEffect(() => {
  //   methods.reset(cvData);
  //   return () => {};
  // }, [cvData, methods]);

  // const onSubmit = (data) => {
  //   alert(JSON.stringify(data));
  // };

  // <FormProvider {...methods}>
  //   <form onSubmit={methods.handleSubmit(onSubmit)}>
  //   </form>
  // </FormProvider>

  return (
    <NavContainer>
      <ToolboxContainer />
      <CvContainer>
        <CvTitle />
        <CvProfile />
        {/* <CvSectionWrapper name="summary" setting={CvSettingSummay}>
          <CvSummary />
        </CvSectionWrapper>
        <CvSectionWrapper name="education" setting={CvSettingEducation}>
          <CvEducation />
        </CvSectionWrapper> */}
        {/* {fields.map((field, index) => (
              <CvSectionBase
                index={index}
                key={field.record}
                record={field.record}
              />
            ))} */}
      </CvContainer>
    </NavContainer>
  );
};

export default CvBuilderPage;
