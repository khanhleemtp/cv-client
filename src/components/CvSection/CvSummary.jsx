import React from 'react';
import CvSectionWrapper from './CvSectionWrapper';
import CvSectionTitle from './CvSectionTitle';
import { useFormContext, useFieldArray } from 'react-hook-form';
import CvTypography from './CvTypography';
import { selectCvSection } from '../../redux/cv/cv.selectors';
import { connect } from 'react-redux';

const CvSummary = () => {
  const { register, control } = useFormContext();

  return (
    <div>
      <CvSectionTitle placeholder="Summary" name="summary" />
      <CvSectionWrapper name="summary-details">
        <CvTypography type="p" placeholder="Thông tin thêm" />
      </CvSectionWrapper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: selectCvSection('SummarySection')(state),
});

export default connect(mapStateToProps)(CvSummary);
