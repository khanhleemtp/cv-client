import Navbar from './../header/header.component';

const NavContainer = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="mt-16">{children}</div>
    </>
  );
};

export default NavContainer;
