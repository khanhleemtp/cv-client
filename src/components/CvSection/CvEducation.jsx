import React from 'react';
import CvSectionWrapper from './CvSectionWrapper';
import CvSectionTitle from './CvSectionTitle';
import CvTypography from './CvTypography';
import { useFormContext } from 'react-hook-form';

const CvEducation = () => {
  const { register } = useFormContext();

  return (
    <div>
      <CvSectionTitle placeholder="Education" name="Education" />
      <CvSectionWrapper name="Education-details">
        <CvTypography type="h3" placeholder="Bằng cấp và lĩnh vực nghiên cứu" />
      </CvSectionWrapper>
    </div>
  );
};

export default CvEducation;
