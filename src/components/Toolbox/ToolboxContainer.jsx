import RoundIcon from '../../components/RoundedIcon';
import {
  // PlusIcon,
  EyeIcon,
  ChevronRightIcon,
  TemplateIcon,
  ChevronDownIcon,
  ShareIcon,
  SwitchHorizontalIcon,
  // ColorSwatchIcon,
  // PhotographIcon,
  // DocumentTextIcon,
} from '@heroicons/react/solid';
import RootModal from '../RootModal';
import ToolboxButton from './ToolboxButton';
import { connect } from 'react-redux';
import { openModal } from './../../redux/viewState/viewState.action';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ToolboxContainer = ({
  openSectionModal,
  previewCvModal,
  templateCvModal,
  dragCvModal,
}) => {
  const { id } = useParams();
  return (
    <div className="bg-white overflow-auto px-2 h-16 md:py-2 md:h-auto md:px-6 flex  items-center z-40 md:z-20 sticky top-0 md:top-16 shadow-inner">
      <RootModal />
      <RoundIcon
        icon={ChevronRightIcon}
        bgColorClass="bg-indigo-100"
        title="Mở rộng"
        iconColorClass="text-indigo-500"
        onClick={openSectionModal}
      />
      <RoundIcon
        icon={TemplateIcon}
        title="Thay đổi thứ tự"
        onClick={dragCvModal}
      />
      <RoundIcon
        icon={EyeIcon}
        bgColorClass="bg-indigo-500"
        title="Xem trước"
        onClick={previewCvModal}
      />
      <ToolboxButton
        leftIcon={SwitchHorizontalIcon}
        rightIcon={ChevronDownIcon}
        onClick={templateCvModal}
      >
        Templates
      </ToolboxButton>
      {/* <ToolboxButton
        leftIcon={SwitchHorizontalIcon}
        rightIcon={ChevronDownIcon}
      >
        Scaling
      </ToolboxButton>
      <ToolboxButton leftIcon={ColorSwatchIcon} rightIcon={ChevronDownIcon}>
        Color
      </ToolboxButton> */}
      {/* <ToolboxButton leftIcon={DocumentTextIcon} rightIcon={ChevronDownIcon}>
        Font
      </ToolboxButton> */}
      <CopyToClipboard
        text={`{process.env.REACT_APP_STATIC}/preview/${id}`}
        onCopy={() => toast.success('Sao chép thành công')}
      >
        <ToolboxButton leftIcon={ShareIcon} rightIcon={ChevronDownIcon}>
          Chia sẻ
        </ToolboxButton>
      </CopyToClipboard>
      {/* <ToolboxButton
        leftIcon={SwitchHorizontalIcon}
        rightIcon={ChevronDownIcon}
      >
        Margin
      </ToolboxButton> */}
      {/* <ToolboxButton leftIcon={PhotographIcon} rightIcon={ChevronDownIcon}>
        Background
      </ToolboxButton> */}
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  openSectionModal: () =>
    dispatch(
      openModal('SECTION_CV', {
        title: 'Các trường',
        type: 'SECTIONS',
      })
    ),
  previewCvModal: () =>
    dispatch(openModal('SECTION_CV', { title: 'Xem trước', type: 'PREVIEW' })),
  templateCvModal: () =>
    dispatch(openModal('SECTION_CV', { title: 'Mẫu CV', type: 'TEMPLATE' })),
  dragCvModal: () =>
    dispatch(
      openModal('SECTION_CV', {
        title: 'Thay đổi thứ tự',
        type: 'DRAG',
        move: ownProps?.move,
        update: ownProps?.update,
      })
    ),
});

export default connect(null, mapDispatchToProps)(ToolboxContainer);
