import { useHistory } from 'react-router-dom';

const NotFound = ({ text }) => {
  const history = useHistory();

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-64 h-64 md:h-96 md:w-96 mt-20 flex items-start flex-col bg-contain bg-error-boundary bg-no-repeat"></div>
      <div className="text-center text-xl">
        <span className=" text-gray-400 font-mono">{text}</span>{' '}
        <span>🦕🐈🐕‍🦺</span>
      </div>
      <button
        onClick={() => {
          history.push('/');
        }}
        className="bg-indigo-400 text-gray-100 p-2 rounded-lg font-mono mt-2"
      >
        Trở về trang chủ
      </button>
    </div>
  );
};

export default NotFound;
