import Navbar from './../header/header.component';

const NavContainer = ({ children, onClick = () => {}, ...props }) => {
  return (
    <div {...props}>
      <Navbar onClick={onClick} />
      <div className="mt-16">{children}</div>
    </div>
  );
};

export default NavContainer;
