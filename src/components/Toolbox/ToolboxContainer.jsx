import { useState } from 'react';
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
import StateModal from './../StateModal';

const ToolboxContainer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white px-2 md:px-6 py-1.5 flex overflow-auto items-center">
      <StateModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalType="UPLOAD_IMAGE"
      />
      <RootModal />
      <RoundIcon icon={PlusIcon} onClick={() => setIsOpen(true)} />
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

export default ToolboxContainer;
