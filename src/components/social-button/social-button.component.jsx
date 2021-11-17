import { IconContext } from 'react-icons';

const SocialButton = ({ text = '', icon: Component, bgColor, textColor }) => {
  return (
    <button
      className={`px-4 w-28 flex items-center justify-center rounded-md py-2 ring-gray-200 ring-2 ${textColor} font-sans hover:bg-gray-200`}
    >
      <div className={`${bgColor} mr-1`}>
        <IconContext.Provider
          value={{
            size: '1em',
            className: 'text-white',
          }}
        >
          <Component />
        </IconContext.Provider>
      </div>
      {text}
    </button>
  );
};

export default SocialButton;
