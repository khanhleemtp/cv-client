import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import clsx from 'clsx';
import { selectSelectedSection } from './../../redux/viewState/viewState.selectors';

import { useEffect } from 'react';
import { useFieldArray, useForm, FormProvider } from 'react-hook-form';
import { selectCvData, selectUpdatingCv } from './../../redux/cv/cv.selectors';
import ToolboxContainer from '../Toolbox/ToolboxContainer';
import CvProfile from './CvProfile';
import CvSection from './CvSection';
import CvTitle from './CvTitle';

const CvContainer = ({ isSelected, cvData, isUpdating }) => {
  const methods = useForm({ defaultValues: cvData });
  const { control } = methods;

  const { reset } = methods;

  useEffect(() => {
    reset(cvData, {
      keepDirty: false,
      keepValues: true,
    });
  }, [cvData, reset]);

  const { fields } = useFieldArray({
    control,
    name: 'sections',
    keyName: '_id',
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <p className="px-2">{isUpdating ? 'Đang lưu...' : 'Đã lưu'}</p>
        <ToolboxContainer />
        <div
          className={clsx(
            'bg-transparent container mx-auto transition-colors ease-in-out',
            {
              'bg-gray-300 bg-opacity-60': isSelected,
            }
          )}
        >
          <CvTitle />
          <CvProfile />
          {fields.map((field, index) => (
            <CvSection index={index} key={field._id} record={field.record} />
          ))}
        </div>
      </form>
    </FormProvider>
  );
};

const mapStateToProps = createStructuredSelector({
  isSelected: selectSelectedSection,
  cvData: selectCvData,
  isUpdating: selectUpdatingCv,
});

export default connect(mapStateToProps)(CvContainer);
