import Button from './../../button/button.component';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { connect } from 'react-redux';
import { updatePasswordStart } from './../../../redux/user/user.action';

const passswordSchema = yup.object().shape({
  passwordCurrent: yup
    .string()
    .min(6, 'Mật khẩu cần nhất 6 ký tự')
    .required('Bạn cần nhập mật khẩu'),
  password: yup
    .string()
    .min(6, 'Mật khẩu cần nhất 6 ký tự')
    .required('Bạn cần nhập mật khẩu mới'),
  rePassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp')
    .required('Bạn cần nhập mật khẩu mới'),
});

const AccountPassword = ({ updatePassword }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(passswordSchema),
  });

  const onSubmit = (data) => {
    updatePassword(data);
    reset({});
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Mật khẩu hiện tại"
        placeholder="Nhập mật khẩu hiện tại"
        error={errors?.passwordCurrent?.message}
        name="passwordCurrent"
        register={register}
      />
      <Input
        label="Mật khẩu mới"
        placeholder="Nhập mật khẩu mới"
        error={errors?.password?.message}
        name="password"
        register={register}
      />
      <Input
        label="Nhập lại mật khẩu mới"
        placeholder="Nhập lại mật khẩu mới"
        error={errors?.rePassword?.message}
        name="rePassword"
        register={register}
      />
      <div className="space-x-2 flex items-center justify-end">
        <Button
          text="Huỷ"
          className="bg-gray-400 hover:bg-gray-600"
          onClick={() => reset({})}
        />
        <Button text="Cập nhật" btnType="submit" />
      </div>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updatePassword: (passInfo) => dispatch(updatePasswordStart(passInfo)),
});

export default connect(null, mapDispatchToProps)(AccountPassword);

const Input = ({ placeholder = '', label = '', error, register, name }) => (
  <div>
    <div className="flex flex-col md:flex-row items-start md:items-center">
      <label className="mr-0 md:mr-10 w-40">{label}</label>
      <input
        {...register(name)}
        type="password"
        className="md:flex-grow rounded-md form-input"
        placeholder={placeholder}
      />
    </div>
    {error && <div className="text-red-500">{error}</div>}
  </div>
);
