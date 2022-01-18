import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import BaseSwitch from '../../switch/BaseSwitch.component';

const ActiveJobSwitch = ({ job, activeJob }) => {
  const methods = useForm({
    defaultValues: {
      isPublic: job.isPublic,
    },
  });

  return (
    <FormProvider {...methods}>
      <BaseSwitch
        name="isPublic"
        label="Hiển thị"
        func={() => {
          const isPublic = methods.getValues('isPublic');
          activeJob({
            id: job.id,
            updateData: { isPublic },
          });
        }}
      />
    </FormProvider>
  );
};

export default ActiveJobSwitch;
