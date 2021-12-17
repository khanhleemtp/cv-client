import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import Button from './button/button.component';
import { updateCvStart } from './../redux/cv/cv.action';
import { connect } from 'react-redux';

const CvListSectionPreview = ({ updateCv }) => {
  const { control, getValues, setValue } = useFormContext();

  const fields = useWatch({ control, name: 'sections' });

  const setSection =
    (name, value = false) =>
    () => {
      setValue(name, value);
      const cvData = getValues();
      updateCv(cvData);
    };

  return (
    <div>
      <div className="font-medium">Đã dùng</div>
      <div className="flex flex-wrap justify-around">
        {fields?.map((field, index) => {
          if (field?.enabled === false) return null;
          return (
            <div
              key={field._id}
              onClick={setSection(`sections.${index}.enabled`)}
              className="relative w-full md:w-40 m-2 shadow-lg cursor-pointer rounded-sm ring-1 ring-gray-200 group bg-gray-100"
            >
              <div className="absolute bg-gray-200 bg-opacity-60 inset-0 hidden group-hover:block" />

              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden group-hover:block">
                <Button size="small" text="Xóa" className="px-6" />
              </div>
              <img
                className="w-full h-auto"
                src={`/assets/sections/${field?.record}.png`}
                alt={`${field?.record}`}
              />
            </div>
          );
        })}
      </div>
      <div className="font-medium">Chưa dùng</div>
      <div className="flex flex-wrap justify-around">
        {fields?.map((field, index) => {
          if (field?.enabled === true) return null;
          return (
            <div
              key={field._id}
              onClick={setSection(`sections.${index}.enabled`, true)}
              className="relative w-full md:w-40 m-2 shadow-lg cursor-pointer rounded-sm ring-1 ring-gray-200 group bg-gray-100"
            >
              <div className="absolute bg-gray-200 bg-opacity-60 inset-0 hidden group-hover:block" />

              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden group-hover:block">
                <Button size="small" text="Thêm" />
              </div>
              <img
                className="w-full h-auto"
                src={`/assets/sections/${field?.record}.png`}
                alt={`${field?.record}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateCv: (data) =>
    dispatch(updateCvStart({ id: data.id, updateData: data })),
});

export default connect(null, mapDispatchToProps)(CvListSectionPreview);
