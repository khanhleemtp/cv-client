import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import BaseSwitch from '../../switch/BaseSwitch.component';

const ActiveEmployerSwitch = ({ employer, activeEmployer, disabled }) => {
  const methods = useForm({
    defaultValues: {
      active: employer?.active,
    },
  });

  return (
    <FormProvider {...methods}>
      <BaseSwitch
        disabled={disabled}
        name="active"
        label="Kích hoạt"
        func={() => {
          const active = methods.getValues('active');
          activeEmployer({
            id: employer.id,
            updateData: { active },
          });
        }}
      />
    </FormProvider>
  );
};

export default ActiveEmployerSwitch;
