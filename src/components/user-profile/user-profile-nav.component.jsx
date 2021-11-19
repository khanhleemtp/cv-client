import { Link } from 'react-router-dom';

const UserProfileNav = () => {
  return (
    <div className="flex items-center justify-center bg-gray-200 py-4">
      <Link to="/" className="hover:text-indigo-500 mx-2 font-medium">
        Profile
      </Link>
      <Link to="/" className="hover:text-indigo-500 mx-2 font-medium">
        Home
      </Link>
      <Link to="/" className="hover:text-indigo-500 mx-2 font-medium">
        NTD
      </Link>
      <Link to="/" className="hover:text-indigo-500 mx-2 font-medium">
        Logout
      </Link>
    </div>
  );
};

export default UserProfileNav;
