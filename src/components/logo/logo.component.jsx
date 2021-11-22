import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';

const LogoApp = () => {
  return (
    <Link to="/" className="flex items-center">
      <div className="text-indigo-500 flex items-center mr-1">
        <Logo className="w-8 h-8" />
      </div>
      <div className="text-3xl font-bold font-mono text-indigo-500">
        <span className="mr-1 text-gray-400">LD</span>
        <span>Job</span>
      </div>
    </Link>
  );
};

export default LogoApp;
