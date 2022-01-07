import React from 'react';
import { Controller } from 'react-hook-form';
import WYSIWYGEditor from './WYSIWYG';

const AppEditor = ({ control, name, label }) => {
  // Handle Data Submit to APi for SignUp

  return (
    <div className="flex flex-col">
      <label className="m-2">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <WYSIWYGEditor value={field.value} onChange={field.onChange} />
          );
        }}
      />
    </div>
  );
};
export default AppEditor;
