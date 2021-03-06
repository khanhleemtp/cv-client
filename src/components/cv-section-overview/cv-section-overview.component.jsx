import { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  useFieldArray,
  useForm,
  FormProvider,
  useWatch,
} from 'react-hook-form';
import clsx from 'clsx';
import { isEmpty } from 'lodash';

import {
  selectSelectedItem,
  selectSelectedPopover,
  selectSelectedSection,
} from './../../redux/viewState/viewState.selectors';
import {
  selectCvData,
  selectSectionNormalize,
  selectUpdatingCv,
} from './../../redux/cv/cv.selectors';

import { clearBackground } from '../../redux/viewState/viewState.action';
import NotFound from './../not-found/not-found.component';
import NavContainer from './../nav-container/nav-container.component';
import CvTypography from './../cv-section-item/common/typography/cv-typography';
import CvProfile from './../cv-section-item/profile/cv-profile.component';
import CvSectionBase from './../cv-section-item/base/cv-section-base.component';
import ToolboxContainer from './../tool-box/ToolboxContainer';
import BaseModal from '../Modal/BaseModal';

const CvSectionOverview = ({
  cvData,
  isUpdating,
  clear,
  popover,
  selectedSection,
  selectedItem,
}) => {
  const methods = useForm({ defaultValues: cvData });

  const { control } = methods;
  const { reset } = methods;

  useEffect(() => {
    reset(cvData, {
      keepDirty: false,
      keepValues: true,
    });
  }, [cvData, reset]);

  const layout = useWatch({ control, name: 'style.layout' });

  const { fields, move, replace } = useFieldArray({
    control,
    name: 'sections',
    keyName: '_id',
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  const handleClear = (e) => {
    if (selectedItem === null && selectedSection === null && popover === null)
      return;
    e.stopPropagation();
    clear();
  };

  return !isEmpty(cvData) ? (
    <>
      <NavContainer className="relative" onClick={handleClear}>
        <div className="absolute inset-0" onClick={handleClear}></div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <ToolboxContainer
              move={move}
              update={replace}
              cv={cvData}
              onClick={handleClear}
            />
            <BaseModal />

            <div
              className={clsx(
                'bg-transparent my-4 container mx-auto transition-colors ease-in-out max-w-3xl md:p-12 md:border-2 md:shadow-2xl md:py-4',
                {
                  'bg-gray-300 bg-opacity-20': selectedSection,
                }
              )}
              style={{
                minHeight: '842px',
              }}
            >
              <div className="flex items-center">
                <div className="whitespace-nowrap mx-2 pb-1 text-lg text-indigo-500">
                  Ti??u ?????:
                </div>
                <CvTypography name="title" />
              </div>
              <p className="hidden md:block px-2">
                {isUpdating ? '??ang l??u...' : '???? l??u'}
              </p>
              <CvProfile />
              {layout === 'double' ? (
                <div className="flex flex-col md:flex-row">
                  <div className="flex flex-col w-full md:w-8/12">
                    {fields?.map((field, index) => {
                      if (field.column === 0) return null;
                      return (
                        <CvSectionBase
                          section={index}
                          index={index}
                          key={field._id}
                          record={field.record}
                          move={move}
                          update={replace}
                        />
                      );
                    })}
                  </div>
                  <div className="flex flex-col w-full md:w-6/12">
                    {fields?.map((field, index) => {
                      if (field.column === 1) return null;
                      return (
                        <CvSectionBase
                          section={index}
                          index={index}
                          key={field._id}
                          record={field.record}
                          move={move}
                          update={replace}
                        />
                      );
                    })}
                  </div>
                </div>
              ) : (
                fields?.map((field, index) => (
                  <CvSectionBase
                    section={index}
                    index={index}
                    key={field._id}
                    record={field.record}
                    move={move}
                    update={replace}
                  />
                ))
              )}
            </div>
          </form>
        </FormProvider>
      </NavContainer>
    </>
  ) : (
    <NotFound />
  );
};

const mapStateToProps = createStructuredSelector({
  popover: selectSelectedPopover,
  cvData: selectCvData,
  cvNormalize: selectSectionNormalize,
  isUpdating: selectUpdatingCv,
  selectedSection: selectSelectedSection,
  selectedItem: selectSelectedItem,
});

const mapDispatchToProps = (dispatch) => ({
  clear: () => dispatch(clearBackground()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CvSectionOverview);
