import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { IconContext } from 'react-icons';
import { useDispatch } from 'react-redux';
import SignSocial from '../sign-social/sign-social.component';
import { signUpStart } from './../../redux/user/user.action';

const signUpSchema = yup.object().shape({
  name: yup.string().required('Bạn cần nhập tên'),
  email: yup
    .string()
    .email('Bạn cần nhập đúng định dạng email')
    .required('Bạn cần nhập email'),
  password: yup
    .string()
    .min(6, 'Mật khẩu cần nhất 6 ký tự')
    .required('Bạn cần nhập mật khẩu'),
  isAccept: yup.bool().oneOf([true], 'Bạn cần chấp nhận các điều khoản.'),
});

const SignUp = ({ onToggleForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      isAccept: false,
    },
    resolver: yupResolver(signUpSchema),
  });

  const dispatch = useDispatch();

  const [hiddenPassword, setHiddenPassword] = useState(true);

  const onSubmit = (data) => {
    dispatch(signUpStart(data));
  };

  const onToggleHiddenPassword = () => {
    setHiddenPassword(!hiddenPassword);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
      <div className="bg-transparent px-4 sm:px-8 lg:bg-white lg:shadow-lg rounded lg:border-2 lg:px-14 lg:py-16">
        <div className="text-center text-xl font-sans text-indigo-500">
          Đăng ký với
        </div>
        <SignSocial />
        <div className="font-sans text-indigo-500 text-center my-8">
          Hoặc đăng ký với email
        </div>
        <div>
          <label>Tên người dùng</label>
          <input
            type="text"
            {...register('name')}
            className="input-rounded"
            autoFocus
          />
          <div className="text-red-500 text-sm font-sans">
            {errors.name?.message}
          </div>
        </div>
        <div>
          <label>Email</label>
          <input
            autoComplete="username"
            type="text"
            {...register('email')}
            className="input-rounded"
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
        <div>
          <label className="inline-flex">
            <input
              type="checkbox"
              {...register('isAccept')}
              className="rounded
                      form-checkbox
                      border-gray-300
                      text-indigo-600
                        shadow-sm
                      focus:border-indigo-300
                        focus:ring
                        focus:ring-offset-0
                        focus:ring-indigo-200
                        focus:ring-opacity-50"
            />
            <span className="ml-2 text-xs font-sans">
              Tôi đồng ý với Điều khoản và chính sách bảo mật*
            </span>
          </label>
          <div className="text-red-500 text-sm font-sans">
            {errors.isAccept?.message}
          </div>
        </div>

        <div className="my-6">
          <button
            className="btn-cv"
            // onClick={() => setActiveForm(false)}
            type="submit"
          >
            Đăng ký
          </button>
        </div>
        <div className="text-center leading-7">
          <div>
            Bạn đã có tài khoản?{' '}
            <span
              className="text-indigo-500 hover:text-indigo-400 font-semibold cursor-pointer"
              onClick={onToggleForm}
            >
              Đăng nhập ngay
            </span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
