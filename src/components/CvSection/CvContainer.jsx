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
        <ToolboxContainer />
        <div
          className={clsx(
            'bg-transparent container mx-auto transition-colors ease-in-out max-w-3xl md:p-12 md:border-2 md:shadow-2xl md:my-4',
            {
              'bg-gray-300 bg-opacity-20': isSelected,
            }
          )}
        >
          <CvTitle />
          <p className="hidden md:block px-2">
            {isUpdating ? 'Đang lưu...' : 'Đã lưu'}
          </p>
          <CvProfile />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field, index) => (
              <CvSection index={index} key={field._id} record={field.record} />
            ))}
          </div>
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
