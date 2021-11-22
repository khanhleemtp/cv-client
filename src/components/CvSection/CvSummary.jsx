import React from 'react';
import CvSectionWrapper from './CvSectionWrapper';
import CvSectionTitle from './CvSectionTitle';
import TextareaAutosize from 'react-textarea-autosize';

const CvSummary = () => {
  return (
    <div>
      <CvSectionTitle placeholder="Summary" name="summary" />
      <CvSectionWrapper name="summary-details">
        <TextareaAutosize
          className="w-full border-0 ring-0 bg-transparent font-semibold focus:ring-0 pt-4"
          placeholder="Hãy giới thiệu thông tin thêm về bạn như sở thích"
          maxRows={9999}
        />
      </CvSectionWrapper>
    </div>
  );
};

export default CvSummary;
