import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../button/button.component';

const ButtonBeforeLogin = () => {
  return (
    <>
      <Link to="/login">
        <Button text="Đăng nhập" />
      </Link>
      <span className="mx-1.5 my-1 md:my-0"></span>
      <Link to="/register-company">
        <Button text="Đăng tuyển & tìm hồ sơ" type="outline" />
      </Link>
    </>
  );
};

export default ButtonBeforeLogin;
