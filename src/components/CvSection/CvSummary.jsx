import React from 'react';
import CvSectionWrapper from './CvSectionWrapper';
import CvSectionTitle from './CvSectionTitle';

const CvSummary = () => {
  return (
    <>
      <CvSectionTitle placeholder="Summary" />
      <CvSectionWrapper name="test">
        <textarea
          rows="3"
          className="w-full border-0 bg-transparent font-semibold focus:ring-0"
          placeholder="Hãy giới thiệu thông tin thêm về bạn như sở thích"
        />
      </CvSectionWrapper>
    </>
  );
};

export default CvSummary;
