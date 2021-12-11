import CvTypography from './CvTypography';
import CvSectionWrapper from './CvSectionWrapper';
import CvSettingProfile from './Setting/Profile/CvSettingProfile';
import CvProfileImage from './CvProfileImage';

const CvProfile = () => {
  return (
    <CvSectionWrapper name="header" container setting={<CvSettingProfile />}>
      <div className="flex items-center">
        <div className="flex-grow">
          <CvTypography
            type="h1"
            placeholder="Họ tên"
            name={'header.name'}
            bold
          />
          <CvTypography
            type="h2"
            placeholder="Vị trí công việc bạn muốn ứng tuyển?"
            color="secondary"
            bold
            name={'header.title'}
          />
          <CvTypography
            type="h4"
            placeholder="Số điện thoại"
            icon="phone"
            name={'header.phone'}
          />
          <CvTypography
            type="h4"
            name={'header.email'}
            placeholder="Email"
            icon="mail"
          />
          <CvTypography
            type="h4"
            name={'header.link'}
            placeholder="Website/Link"
            icon="link"
          />
          <CvTypography
            type="h4"
            name={'header.address'}
            placeholder="Địa chỉ"
            icon="location"
          />
        </div>
        <CvProfileImage name={'header.photo'} />
      </div>
    </CvSectionWrapper>
  );
};

export default CvProfile;
