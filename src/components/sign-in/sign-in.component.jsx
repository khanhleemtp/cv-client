import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { IconContext } from 'react-icons';

import { Link } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { emailSignInStart } from './../../redux/user/user.action';
import SignSocial from '../sign-social/sign-social.component';
import { createStructuredSelector } from 'reselect';
import { selectLoadingApi } from '../../redux/user/user.selectors';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Bạn cần nhập đúng định dạng email')
    .required('Bạn cần nhập email'),
  password: yup
    .string()
    .min(6, 'Mật khẩu cần nhất 6 ký tự')
    .required('Bạn cần nhập mật khẩu'),
});

const SignIn = ({ onToggleForm, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });

  const dispatch = useDispatch();

  const [hiddenPassword, setHiddenPassword] = useState(true);

  const onSubmit = (data) => {
    console.log(data);
    dispatch(emailSignInStart(data));
  };

  const onToggleHiddenPassword = () => {
    setHiddenPassword(!hiddenPassword);
  };

  return (
    <div className="bg-transparent px-4 sm:px-8 lg:bg-white lg:shadow-lg rounded lg:border-2 lg:px-14 lg:py-16 w-full max-w-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-center text-2xl font-sans text-indigo-500">
          Đăng nhập vào tài khoản
        </div>
        <SignSocial />
        <div className="font-sans text-indigo-500 text-center my-8">
          Hoặc đăng nhập với email
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            autoComplete="username"
            {...register('email')}
            className="input-rounded"
            autoFocus
          />
          <div className="text-red-500 text-sm font-sans">
            {errors.email?.message}
          </div>
        </div>
        <div>
          <label>Mật khẩu</label>
          <div className="relative">
            <input
              autoComplete="current-password"
              type={hiddenPassword ? 'password' : 'text'}
              {...register('password')}
              className="input-rounded"
            />
            <div
              className="text-indigo-400 absolute cursor-pointer top-1/2 transform -translate-y-1/2 right-3"
              onClick={onToggleHiddenPassword}
            >
              <IconContext.Provider
                value={{
                  size: '1.5em',
                }}
              >
                {hiddenPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
              </IconContext.Provider>
            </div>
          </div>
          <div className="text-red-500 text-sm font-sans">
            {errors.password?.message}
          </div>
        </div>
        <div className="my-6">
          <button
            className="btn-cv"
            // onClick={() => setActiveForm(false)}
            type="submit"
          >
            {isLoading ? 'Đang đăng nhập..' : 'Đăng nhập'}
          </button>
        </div>
        <div className="text-center leading-7">
          <div>
            <Link
              to="/forgot"
              className="text-indigo-500 hover:text-indigo-400 font-semibold"
            >
              Quên mật khẩu?
            </Link>
          </div>
          <div>
            Bạn chưa có tài khoản?{' '}
            <span
              className="text-indigo-500 hover:text-indigo-400 font-semibold cursor-pointer"
              onClick={onToggleForm}
            >
              Đăng ký ngay
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectLoadingApi,
});

export default connect(mapStateToProps)(SignIn);
