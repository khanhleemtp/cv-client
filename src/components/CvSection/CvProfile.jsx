import {
  PhoneIcon,
  MailIcon,
  LocationMarkerIcon,
  LinkIcon,
} from '@heroicons/react/solid';
import TextareaAutosize from 'react-textarea-autosize';
import { useFormContext } from 'react-hook-form';
import CvIconInput from './CvIconInput';
import CvTypography from './CvTypography';

const CvProfile = () => {
  const { register } = useFormContext();
  return (
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
        {...register('header.title')}
      />
      <CvIconInput
        placeholder="Số điện thoại"
        icon={PhoneIcon}
        {...register('header.phone')}
        // defaultValue={header?.phone}
      />
      <CvIconInput
        {...register('header.email')}
        placeholder="Email"
        icon={MailIcon}
        // defaultValue={header?.email}
      />
      <CvIconInput
        {...register('header.link')}
        placeholder="Website/Link"
        icon={LinkIcon}
        // defaultValue={header?.link}
      />
      <CvIconInput
        {...register('header.address')}
        placeholder="Địa chỉ"
        icon={LocationMarkerIcon}
        // defaultValue={header?.address}
      />
    </div>
  );
};

export default CvProfile;
