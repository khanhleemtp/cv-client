import {
  PhoneIcon,
  MailIcon,
  LocationMarkerIcon,
  LinkIcon,
} from '@heroicons/react/solid';
import { useFormContext } from 'react-hook-form';
import { createStructuredSelector } from 'reselect';
import CvIconInput from './CvIconInput';
import CvTypography from './CvTypography';
import { selectCvHeader } from './../../redux/cv/cv.selectors';
import { connect } from 'react-redux';

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

const mapStateToProps = createStructuredSelector({
  profileData: selectCvHeader,
});

export default connect(mapStateToProps)(CvProfile);
