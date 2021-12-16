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
import CvTypography from './CvTypography';

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
          <div className="flex items-center">
            <div className="whitespace-nowrap mx-2 pb-1 text-lg text-indigo-500">
              Tiêu đề:{' '}
            </div>
            <CvTypography name="title" />
          </div>
          <p className="hidden md:block px-2">
            {isUpdating ? 'Đang lưu...' : 'Đã lưu'}
          </p>
          <CvProfile />
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col w-full md:w-8/12">
              {fields.map((field, index) => {
                if (field.column === 0) return null;
                return (
                  <CvSection
                    index={index}
                    key={field._id}
                    record={field.record}
                  />
                );
              })}
            </div>
            <div className="flex flex-col w-full md:w-6/12">
              {fields.map((field, index) => {
                if (field.column === 1) return null;
                return (
                  <CvSection
                    index={index}
                    key={field._id}
                    record={field.record}
                  />
                );
              })}
            </div>
          </div>
          {/* {fields.map((field, index) => (
              <CvSection index={index} key={field._id} record={field.record} />
            ))} */}
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
