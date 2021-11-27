import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
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
import { selectCvData, selectCvSections } from '../../redux/cv/cv.selectors';
import CvSectionBase from '../../components/CvSection/CvSectionBase';

const CvBuilderPage = ({ cvData, sections }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCvStart('619ff2dd3f5cd425c0e24dd4'));
    return () => {};
  }, [dispatch]);

  const methods = useForm({
    defaultValues: cvData,
  });
  useEffect(() => {
    methods.reset(cvData);
    return () => {};
  }, [cvData, methods]);

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  const { fields } = useFieldArray({
    control: methods.control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'sections', // unique name for your Field Array
    keyName: '_id',
    // keyName: "id", default to "id", you can change the key name
  });

  return (
    <NavContainer>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <ToolboxContainer />
          <CvContainer>
            <CvTitle />
            <CvSectionWrapper name="profile" setting={CvSettingProfile}>
              <CvProfile />
            </CvSectionWrapper>
            <CvSectionWrapper name="summary" setting={CvSettingSummay}>
              <CvSummary />
            </CvSectionWrapper>
            <CvSectionWrapper name="education" setting={CvSettingEducation}>
              <CvEducation />
            </CvSectionWrapper>
            {/* {fields.map((field, index) => (
>>>>>>> 6bcdcee... One form manage
              <CvSectionBase
                index={index}
                key={field.record}
                record={field.record}
              />
            ))} */}
          </CvContainer>
        </form>
      </FormProvider>
    </NavContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  cvData: selectCvData,
  sections: selectCvSections,
});

export default connect(mapStateToProps)(CvBuilderPage);
