import {
  PhoneIcon,
  MailIcon,
  LocationMarkerIcon,
  LinkIcon,
} from '@heroicons/react/solid';
import { useFormContext } from 'react-hook-form';
import CvIconInput from './CvIconInput';
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
          {...register('name')}
          bold
        />
        <CvTypography
          type="h2"
          placeholder="Vị trí công việc bạn muốn ứng tuyển?"
          color="secondary"
          {...register('header.title')}
        />
        <CvIconInput
          placeholder="Số điện thoại"
          icon={PhoneIcon}
          {...register('header.phone')}
        />
        <CvIconInput
          {...register('header.email')}
          placeholder="Email"
          icon={MailIcon}
        />
        <CvIconInput
          {...register('header.link')}
          placeholder="Website/Link"
          icon={LinkIcon}
        />
        <CvIconInput
          {...register('address')}
          placeholder="Địa chỉ"
          icon={LocationMarkerIcon}
        />
      </div>
    </CvSectionWrapper>
  );
};

export default CvProfile;
