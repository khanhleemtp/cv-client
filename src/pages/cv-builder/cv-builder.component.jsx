import { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { FormProvider, useForm, useFieldArray } from 'react-hook-form';
import { createStructuredSelector } from 'reselect';

// COMPONENT
import NavContainer from '../../components/nav-container/nav-container.component';
import CvTitle from '../../components/CvSection/CvTitle';
import CvContainer from '../../components/CvSection/CvContainer';
import CvProfile from '../../components/CvSection/CvProfile';
import ToolboxContainer from '../../components/Toolbox/ToolboxContainer';
import CvSectionBase from './../../components/CvSection/CvSectionBase';

// REDUX
import { loadCvStart } from '../../redux/cv/cv.action';
import { selectCvData } from './../../redux/cv/cv.selectors';

const CvBuilderPage = ({ cvData }) => {
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

  const { control } = methods;

  const { fields } = useFieldArray({
    control,
    name: 'sections',
    keyName: '_id',
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <NavContainer>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <button type="submit">Submit</button>
          <ToolboxContainer />
          <CvContainer>
            <CvTitle />
            <CvProfile />
            {fields.map((field, index) => (
              <CvSectionBase
                index={index}
                key={field._id}
                record={field.record}
              />
            ))}
          </CvContainer>
        </form>
      </FormProvider>
      ;
    </NavContainer>
  );
};

const mapDispatchToProps = createStructuredSelector({
  cvData: selectCvData,
});

export default connect(mapDispatchToProps)(CvBuilderPage);
