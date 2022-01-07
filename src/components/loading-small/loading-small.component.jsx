import './loading-small.style.css';

const LoadingSmall = () => {
  return (
    <div className="loader bg-transparent p-2 rounded-full flex space-x-2 w-full">
      <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
    </div>
  );
};

export default LoadingSmall;
