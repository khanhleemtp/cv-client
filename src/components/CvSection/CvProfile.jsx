import { useFormContext } from 'react-hook-form';
import CvTypography from './CvTypography';
import CvSectionWrapper from './CvSectionWrapper';
import CvSettingProfile from './Setting/Profile/CvSettingProfile';

const CvProfile = () => {
  const { register } = useFormContext();

  return (
    <CvSectionWrapper name="header" setting={<CvSettingProfile />}>
      <div>
        <CvTypography
          type="h1"
          placeholder="Họ tên"
          {...register('header.name')}
          bold
        />
        <CvTypography
          type="h2"
          placeholder="Vị trí công việc bạn muốn ứng tuyển?"
          color="secondary"
          bold
          {...register('header.title')}
        />
        <CvTypography
          type="h4"
          placeholder="Số điện thoại"
          icon="phone"
          {...register('header.phone')}
        />
        <CvTypography
          type="h4"
          {...register('header.email')}
          placeholder="Email"
          icon="mail"
        />
        <CvTypography
          type="h4"
          {...register('header.link')}
          placeholder="Website/Link"
          icon="link"
        />
        <CvTypography
          type="h4"
          {...register('header.address')}
          placeholder="Địa chỉ"
          icon="location"
        />
      </div>
    </CvSectionWrapper>
  );
};

export default CvProfile;
