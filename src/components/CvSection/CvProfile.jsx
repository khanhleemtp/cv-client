import {
  PhoneIcon,
  MailIcon,
  LocationMarkerIcon,
  LinkIcon,
} from '@heroicons/react/solid';
import TextareaAutosize from 'react-textarea-autosize';
import { useFormContext } from 'react-hook-form';
import CvIconInput from './CvIconInput';

const CvProfile = () => {
  const { register } = useFormContext();

  return (
    <div>
      <TextareaAutosize
        maxRows={9999}
        type="text"
        className="w-full bg-transparent py-1 text-xl font-bold border-0 focus:ring-0 placeholder-gray-500 focus:placeholder-gray-300"
        placeholder="Họ tên"
        {...register('name')}
      />
      <TextareaAutosize
        maxRows={9999}
        type="text"
        className="w-full bg-transparent py-1 text-lg text-blue-500 font-semibold border-0 focus:ring-0 placeholder-blue-500 focus:placeholder-blue-300"
        placeholder="Vị trí công việc bạn muốn ứng tuyển?"
      />
      <CvIconInput
        {...register('phone')}
        placeholder="Số điện thoại"
        icon={PhoneIcon}
      />
      <CvIconInput {...register('email')} placeholder="Email" icon={MailIcon} />
      <CvIconInput
        {...register('link')}
        placeholder="Website/Link"
        icon={LinkIcon}
      />
      <CvIconInput
        {...register('address')}
        placeholder="Địa chỉ"
        icon={LocationMarkerIcon}
      />
    </div>
  );
};

export default CvProfile;
