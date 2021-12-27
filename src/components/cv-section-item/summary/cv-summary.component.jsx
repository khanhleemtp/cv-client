import CvTypography from './../common/typography/cv-typography';

const CvSummary = ({ name, item, section }) => {
  return (
    <CvTypography
      type="p"
      placeholder="Thông tin thêm"
      name={`${name}.text`}
      item={item}
      section={section}
    />
  );
};

export default CvSummary;
