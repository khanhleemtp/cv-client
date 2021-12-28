import { useDispatch, connect } from 'react-redux';
import { CameraIcon, CogIcon } from '@heroicons/react/solid';
import { openModal } from '../../../../redux/viewState/viewState.action';
import { selectTypeModal } from '../../../../redux/viewState/viewState.selectors';
import CvSettingIcon from '../CvSettingIcon';
import PopoverSetting from '../../../PopoverSetting';
import CvConfigProfile from './CvConfigProfile';

const CvSettingProfile = () => {
  const dispatch = useDispatch();

  const handleOpenModal = () => dispatch(openModal('UPLOAD_IMAGE'));

  return (
    <>
      <CvSettingIcon icon={CameraIcon} onClick={handleOpenModal} />
      <PopoverSetting setting={<CvConfigProfile />} name="profile">
        <CvSettingIcon icon={CogIcon} />
      </PopoverSetting>
    </>
  );
};

const mapStateToProps = (state) => ({
  isModalOpen: selectTypeModal(state),
});

export default connect(mapStateToProps)(CvSettingProfile);
