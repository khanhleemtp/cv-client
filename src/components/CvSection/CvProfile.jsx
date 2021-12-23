import CvTypography from './CvTypography';
import CvSectionWrapper from './CvSectionWrapper';
import CvSettingProfile from './Setting/Profile/CvSettingProfile';
import CvProfileImage from './CvProfileImage';
import { useWatch, useFormContext } from 'react-hook-form';

const CvProfile = () => {
  const { control } = useFormContext();
  const showTitle = useWatch({ control, name: 'header.showTitle' });
  const showEmail = useWatch({ control, name: 'header.showEmail' });
  const showAddress = useWatch({ control, name: 'header.showAddress' });
  const showLink = useWatch({ control, name: 'header.showLink' });
  const showPhone = useWatch({ control, name: 'header.showPhone' });
  const showPhoto = useWatch({ control, name: 'header.showPhoto' });

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
            isEnabled={showTitle}
          />
          <CvTypography
            type="h4"
            placeholder="Số điện thoại"
            icon="phone"
            name={'header.phone'}
            isEnabled={showPhone}
          />
          <CvTypography
            type="h4"
            name={'header.email'}
            placeholder="Email"
            icon="mail"
            isEnabled={showEmail}
          />
          <CvTypography
            type="h4"
            name={'header.link'}
            placeholder="Website/Link"
            isEnabled={showLink}
            icon="link"
          />
          <CvTypography
            type="h4"
            name={'header.address'}
            placeholder="Địa chỉ"
            isEnabled={showAddress}
            icon="location"
          />
        </div>
        {showPhoto && <CvProfileImage name={'header.photo'} />}
      </div>
    </CvSectionWrapper>
  );
};

export default CvProfile;
