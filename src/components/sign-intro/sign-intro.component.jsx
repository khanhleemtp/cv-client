import { BsPiggyBank, BsPeople } from 'react-icons/bs';
import { AiOutlineFire } from 'react-icons/ai';
import { IconContext } from 'react-icons';

const Item = ({ text = '', icon: Component }) => (
  <h6 className="flex items-center my-5">
    <IconContext.Provider
      value={{
        className: 'text-indigo-400 mr-2',
        size: '2em',
      }}
    >
      <Component />
    </IconContext.Provider>
    {text}
  </h6>
);

const SignIntro = () => {
  return (
    <div className="hidden lg:block max-w-xs text-gray-500">
      <h4 className="text-2xl font-thin text-indigo-500">
        Tạo một CV nhanh chóng
      </h4>
      <Item
        text="Tiết kiệm thời gian tạo với các mẫu miễn phí"
        icon={BsPiggyBank}
      />
      <Item text="Kết nối với các nhà tuyển dụng hàng đầu" icon={BsPeople} />
      <Item text="Tìm việc nhanh chóng" icon={AiOutlineFire} />
      <div className="text-xs font-mono">LDJob ~ Every thing is easy</div>
    </div>
  );
};

export default SignIntro;
