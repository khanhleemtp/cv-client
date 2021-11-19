import Navbar from './../header/header.component';

const NavContainer = ({ children }) => {
  return (
    <>
      <div>Hello</div>
      <Navbar />
      <div className="mt-12">{children}</div>
    </>
  );
};

export default NavContainer;
