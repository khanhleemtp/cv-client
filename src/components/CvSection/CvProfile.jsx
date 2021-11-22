import {
  PhoneIcon,
  MailIcon,
  LocationMarkerIcon,
  LinkIcon,
} from '@heroicons/react/solid';

const CvProfile = () => {
  return (
    <div>
      <input
        type="text"
        className="w-full bg-transparent py-1 text-xl font-bold border-0 focus:ring-0 placeholder-gray-500 focus:placeholder-gray-300"
        placeholder="Họ tên"
      />
      <input
        type="text"
        className="w-full bg-transparent py-1 text-lg text-blue-500 font-semibold border-0 focus:ring-0 placeholder-blue-500 focus:placeholder-blue-300"
        placeholder="Vị trí công việc bạn muốn ứng tuyển?"
      />
      <div className="w-full bg-transparent relative">
        <PhoneIcon className="text-blue-500 pointer-events-none w-4 h-4 absolute top-1/2 transform -translate-y-1/2 left-3" />
        <input
          type="text"
          className="pl-8 w-full bg-transparent text-xs font-medium border-0 focus:ring-0 placeholder-gray-500 focus:placeholder-gray-300"
          placeholder="Số điện thoại"
        />
      </div>
      <div className="w-full bg-transparent relative">
        <MailIcon className="text-blue-500 pointer-events-none w-4 h-4 absolute top-1/2 transform -translate-y-1/2 left-3" />
        <input
          type="text"
          className="pl-8 w-full bg-transparent text-xs font-medium border-0 focus:ring-0 placeholder-gray-500 focus:placeholder-gray-300"
          placeholder="Email"
        />
      </div>
      <div className="w-full bg-transparent relative">
        <LinkIcon className="text-blue-500 pointer-events-none w-4 h-4 absolute top-1/2 transform -translate-y-1/2 left-3" />
        <input
          type="text"
          className="w-full bg-transparent pl-8 text-xs font-medium border-0 focus:ring-0 placeholder-gray-500 focus:placeholder-gray-300"
          placeholder="Website/Link"
        />
      </div>
      <div className="w-full bg-transparent relative">
        <LocationMarkerIcon className="text-blue-500 pointer-events-none w-4 h-4 absolute top-1/2 transform -translate-y-1/2 left-3" />
        <input
          type="text"
          className="w-full bg-transparent pl-8 text-xs font-medium border-0 focus:ring-0 placeholder-gray-500 focus:placeholder-gray-300"
          placeholder="Địa chỉ"
        />
      </div>
    </div>
  );
};

export default CvProfile;
