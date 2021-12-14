import RoundIcon from '../../components/RoundedIcon';
import {
  PlusIcon,
  EyeIcon,
  ChevronRightIcon,
  TemplateIcon,
  ChevronDownIcon,
  SwitchHorizontalIcon,
  ColorSwatchIcon,
  ShareIcon,
  PhotographIcon,
  DocumentTextIcon,
} from '@heroicons/react/solid';
import RootModal from '../RootModal';
import ToolboxButton from './ToolboxButton';
import { connect } from 'react-redux';
import { openModal } from './../../redux/viewState/viewState.action';

const ToolboxContainer = ({ openSectionModal }) => {
  return (
    <div className="bg-white px-2 h-16 md:py-2 md:h-auto md:px-6 flex overflow-auto items-center z-40 md:z-20 sticky top-0 md:top-16 shadow-inner">
      <RootModal />
      <RoundIcon icon={PlusIcon} onClick={openSectionModal} />
      <RoundIcon
        icon={ChevronRightIcon}
        bgColorClass="bg-indigo-100"
        iconColorClass="text-indigo-500"
      />
      <RoundIcon icon={EyeIcon} bgColorClass="bg-indigo-500" />

      <ToolboxButton leftIcon={TemplateIcon} rightIcon={ChevronDownIcon}>
        Templates
      </ToolboxButton>
      <ToolboxButton
        leftIcon={SwitchHorizontalIcon}
        rightIcon={ChevronDownIcon}
      >
        Scaling
      </ToolboxButton>
      <ToolboxButton leftIcon={ColorSwatchIcon} rightIcon={ChevronDownIcon}>
        Color
      </ToolboxButton>
      <ToolboxButton leftIcon={DocumentTextIcon} rightIcon={ChevronDownIcon}>
        Font
      </ToolboxButton>
      <ToolboxButton leftIcon={ShareIcon} rightIcon={ChevronDownIcon}>
        Share
      </ToolboxButton>
      <ToolboxButton
        leftIcon={SwitchHorizontalIcon}
        rightIcon={ChevronDownIcon}
      >
        Margin
      </ToolboxButton>
      <ToolboxButton leftIcon={PhotographIcon} rightIcon={ChevronDownIcon}>
        Background
      </ToolboxButton>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  openSectionModal: () => dispatch(openModal('SECTION_CV')),
});

export default connect(null, mapDispatchToProps)(ToolboxContainer);
