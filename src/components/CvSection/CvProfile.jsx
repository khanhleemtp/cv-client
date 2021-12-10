import CvTypography from './CvTypography';
import CvSectionWrapper from './CvSectionWrapper';
import CvSettingProfile from './Setting/Profile/CvSettingProfile';

const CvProfile = () => {
  return (
    <CvSectionWrapper name="header" container setting={<CvSettingProfile />}>
      <div>
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
    </CvSectionWrapper>
  );
};

export default CvProfile;
