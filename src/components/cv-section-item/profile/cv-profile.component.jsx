import { useWatch, useFormContext } from 'react-hook-form';
import CvTypography from './../common/typography/cv-typography';
import CvWrapper from './../common/wrapper/cv-wrapper.component';
import CvSettingSectionItem from './../setting/cv-setting-section-item.component';
import { openModal } from './../../../redux/viewState/viewState.action';
import { connect } from 'react-redux';
import CvProfileImage from './cv-profile-image.component';
import CvConfigProfile from './../popover/cv-profile-config.component';

const CvProfile = ({ handleUploadImage }) => {
  const { control } = useFormContext();

  const showPhoto = useWatch({ control, name: 'header.showPhoto' });

  return (
    <CvWrapper
      section="profile"
      container
      setting={
        <CvSettingSectionItem
          list={[
            {
              icon: 'camera',
              onClick: handleUploadImage,
            },
            {
              icon: 'config',
              popover: 'profile',
              component: <CvConfigProfile />,
            },
          ]}
        />
      }
    >
      <div className="flex items-center">
        <div className="flex-grow">
          <CvTypography
            type="h1"
            placeholder="Họ tên"
            name={'header.name'}
            section="profile"
            bold
          />
          <CvTypography
            type="h2"
            placeholder="Vị trí công việc bạn muốn ứng tuyển?"
            color="secondary"
            bold
            name={'header.title'}
            isEnabled={'header.showTitle'}
            section="profile"
          />
          <CvTypography
            type="h4"
            placeholder="Số điện thoại"
            icon="phone"
            name={'header.phone'}
            isEnabled={'header.showPhone'}
            section="profile"
          />
          <CvTypography
            type="h4"
            name={'header.email'}
            placeholder="Email"
            icon="mail"
            isEnabled={'header.showEmail'}
            section="profile"
          />
          <CvTypography
            type="h4"
            name={'header.link'}
            placeholder="Website/Link"
            isEnabled={'header.showLink'}
            icon="link"
            section="profile"
          />
          <CvTypography
            type="h4"
            name={'header.address'}
            placeholder="Địa chỉ"
            isEnabled={'header.showAddress'}
            icon="location"
            section="profile"
          />
        </div>
        {showPhoto && <CvProfileImage name={'header.photo'} />}
      </div>
    </CvWrapper>
  );
};

const mapDispatchToProps = (dispatch) => ({
  handleUploadImage: () => dispatch(openModal('UPLOAD_IMAGE')),
});

export default connect(null, mapDispatchToProps)(CvProfile);
