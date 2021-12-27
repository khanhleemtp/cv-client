import CvTypography from './../common/typography/cv-typography';
import CvTags from './../common/tags/cv-tags.component';

const CvTechnology = ({ name, item, section, fields, insert, remove }) => {
  return (
    <>
      <CvTypography
        type="p"
        color="secondary"
        bold
        placeholder="Nhóm kỹ năng"
        name={`${name}.title`}
        item={item}
        section={section}
      />
      <CvTags
        name={`${name}.tags`}
        item={item}
        section={section}
        fields={fields}
        remove={remove}
        insert={insert}
      />
    </>
  );
};

export default CvTechnology;
