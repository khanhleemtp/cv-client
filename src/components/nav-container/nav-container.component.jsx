import Navbar from './../header/header.component';

const NavContainer = ({ children }) => {
  return (
    <div className="flex-grow">
      <Navbar />
      <div className="mt-16 h-full flex-grow flex flex-col">{children}</div>
    </div>
  );
};

export default NavContainer;
