import React from 'react';
import CvTypography from './../common/typography/cv-typography';
import CvSlider from './../common/slider/cv-slider.component';

const CvLanguage = ({ name, section, item }) => {
  return (
    <div className="">
      <CvTypography
        placeholder="Kỹ năng"
        medium
        className="mb-0"
        name={`${name}.name`}
        section={section}
        item={item}
      />
      <CvSlider
        name={`${name}.level`}
        placeholder="Kỹ năng khác"
        section={section}
        item={item}
      />
    </div>
  );
};

export default CvLanguage;
