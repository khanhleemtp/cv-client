import React from 'react';
import { Controller } from 'react-hook-form';
import WYSIWYGEditor from './WYSIWYG';

const AppEditor = ({ control, name }) => {
  // Handle Data Submit to APi for SignUp

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return <WYSIWYGEditor value={field.value} onChange={field.onChange} />;
      }}
    />
  );
};
export default AppEditor;
