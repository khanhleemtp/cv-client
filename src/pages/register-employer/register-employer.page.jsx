import React from 'react';
import { useForm } from 'react-hook-form';
import InputApp from '../../components/input-app/input-app.component';
import { connect } from 'react-redux';
import Button from '../../components/button/button.component';
import NavContainer from '../../components/nav-container/nav-container.component';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputSelect from '../../components/input-app/input-select.component';
import { registerEmployerStart } from '../../redux/employer/employer.action';
import { POSITION_EMPLOYER, AREA } from '../../data/input.data';

const employerSchema = yup.object().shape({
  name: yup
    .string()
    .required('Bạn cần nhập tên')
    .min(3, 'Tên cần ít nhất 3 ký tự'),
  email: yup
    .string()
    .required('Bạn cần nhập email')
    .email('Bạn cần nhập đúng định dạng email'),
  password: yup
    .string()
    .min(6, 'Mật khẩu cần nhất 6 ký tự')
    .required('Bạn cần nhập mật khẩu'),
  phone: yup.string().required('Bạn số điện thoại'),
  fb: yup.string().required('Bạn cần nhập địa chỉ Facebook'),
});

const RegisterEmployer = ({ registerEmployer }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      position: 'nhan-vien',
      password: '',
      phone: '',
      location: 'ha-noi',
      fb: '',
    },
    resolver: yupResolver(employerSchema),
  });

  const handleSubmitOnClick = (data) => {
    registerEmployer(data);
  };
  return (
    <NavContainer>
      <div className="mx-auto container p-8 max-w-2xl w-full bg-white shadow-lg">
        <div className="text-center text-xl font-medium text-indigo-500 my-2">
          Đăng kí nhà tuyển dụng
        </div>
        <form className="" onSubmit={handleSubmit(handleSubmitOnClick)}>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
            <InputApp
              register={register}
              name="name"
              label="Tên người dùng"
              placeholder="Tên người dùng"
              error={errors?.name?.message}
            />
            <InputApp
              register={register}
              name="email"
              label="Địa chỉ email"
              placeholder="Email"
              error={errors?.email?.message}
            />
            <InputApp
              register={register}
              name="password"
              label="Mật khẩu"
              placeholder="Mật khẩu"
              type="password"
              error={errors?.password?.message}
            />

            <InputSelect
              label="Vị trí"
              options={POSITION_EMPLOYER}
              register={register}
              name="position"
            />

            <InputApp
              register={register}
              name="phone"
              label="Số điện thoại"
              placeholder="Số điện thoại"
              error={errors?.phone?.message}
            />

            <InputSelect
              register={register}
              name="location"
              label="Địa chỉ"
              options={AREA}
            />
            <InputApp
              register={register}
              name="fb"
              label="Facebook"
              placeholder="Facebook"
              error={errors?.fb?.message}
            />
          </div>
          <div className="space-x-2 my-2 flex items-center justify-end">
            <Button text="Đăng ký" btnType="submit" />
          </div>
        </form>
      </div>
    </NavContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  registerEmployer: (data) => dispatch(registerEmployerStart(data)),
});

export default connect(null, mapDispatchToProps)(RegisterEmployer);
