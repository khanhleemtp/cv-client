import {
  PhoneIcon,
  MailIcon,
  LocationMarkerIcon,
  LinkIcon,
} from '@heroicons/react/solid';
import { FormProvider, useForm } from 'react-hook-form';
import CvIconInput from './CvIconInput';
import CvTypography from './CvTypography';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCvHeader } from './../../redux/cv/cv.selectors';
import CvSectionWrapper from './CvSectionWrapper';
import CvSettingProfile from './Setting/Profile/CvSettingProfile';

const CvProfile = ({ profileData }) => {
  const methods = useForm({
    defaultValues: profileData,
  });

  useEffect(() => {
    methods.reset(profileData);
    return () => {};
  }, [profileData, methods]);

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  const { register } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <CvSectionWrapper name="header" setting={CvSettingProfile}>
          <div>
            <button type="submit">Submit</button>
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
              {...register('title')}
            />
            <CvIconInput
              placeholder="Số điện thoại"
              icon={PhoneIcon}
              {...register('phone')}
              // defaultValue={header?.phone}
            />
            <CvIconInput
              {...register('email')}
              placeholder="Email"
              icon={MailIcon}
              // defaultValue={header?.email}
            />
            <CvIconInput
              {...register('link')}
              placeholder="Website/Link"
              icon={LinkIcon}
              // defaultValue={header?.link}
            />
            <CvIconInput
              {...register('address')}
              placeholder="Địa chỉ"
              icon={LocationMarkerIcon}
              // defaultValue={header?.address}
            />
          </div>
        </CvSectionWrapper>
      </form>
    </FormProvider>
  );
};

const mapStateToProps = createStructuredSelector({
  profileData: selectCvHeader,
});

export default connect(mapStateToProps)(CvProfile);
