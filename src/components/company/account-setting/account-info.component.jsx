import { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useForm } from 'react-hook-form';
import { openModal } from './../../../redux/viewState/viewState.action';
import { selectCurrentUser } from './../../../redux/user/user.selectors';
import Button from './../../button/button.component';
import InputApp from '../../input-app/input-app.component';
import {
  loadingEmployerStart,
  updateEmployerStart,
} from './../../../redux/employer/employer.action';
import {
  selectEmployer,
  selectLoadingEmployer,
} from '../../../redux/employer/employer.selectors';
import LoadingSmall from './../../loading-small/loading-small.component';
import InputFile from './input-file.component';
import InputSelect from './../../input-app/input-select.component';
import { AREA } from '../../data/input.data';
import { POSITION_EMPLOYYER } from './../../data/input.data';

const AccountInfo = ({
  uploadImage,
  user,
  loadEmployer,
  employer,
  loading,
  updateEmployer,
}) => {
  useEffect(() => {
    loadEmployer(user?.id);
  }, [loadEmployer, user]);

  const { handleSubmit, register, reset } = useForm({
    mode: 'onChange',
  });
  const handleReset = () => {
    reset({
      content: '',
      name: user?.name,
      email: user?.email,
      position: employer?.position,
      phone: employer?.phone,
      location: employer?.location,
      fb: employer?.fb,
    });
  };

  useEffect(() => {
    reset({
      content: '',
      name: user?.name,
      email: user?.email,
      position: employer?.position,
      phone: employer?.phone,
      location: employer?.location,
      fb: employer?.fb,
    });
  }, [reset, employer, user]);

  const handleSubmitOnClick = (data) => {
    updateEmployer({ updateData: data, id: user?.id });
  };

  return loading ? (
    <LoadingSmall />
  ) : (
    <form className="" onSubmit={handleSubmit(handleSubmitOnClick)}>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
        <InputFile
          label="Avatar"
          placeholder="Cập nhật"
          onClick={uploadImage}
          photo={user?.photo}
        />
        <InputApp
          register={register}
          name="name"
          label="Tên người dùng"
          placeholder="Tên người dùng"
          disabled={true}
        />
        <InputApp
          register={register}
          name="email"
          label="Địa chỉ email"
          placeholder="Email"
          disabled={true}
        />
        <InputSelect
          label="Vị trí"
          options={POSITION_EMPLOYYER}
          register={register}
          name="position"
        />

        <InputApp
          register={register}
          name="phone"
          label="Số điện thoại"
          placeholder="Số điện thoại"
        />

        <InputSelect
          label="Khu vực"
          options={AREA}
          register={register}
          name="location"
        />

        <InputApp
          register={register}
          name="fb"
          label="Facebook"
          placeholder="Facebook"
        />
      </div>
      <div className="space-x-2 my-2 flex items-center justify-end">
        <Button
          text="Huỷ"
          className="bg-gray-400 hover:bg-gray-600"
          onClick={handleReset}
        />
        <Button text="Cập nhật" btnType="submit" />
      </div>
    </form>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  employer: selectEmployer,
  loading: selectLoadingEmployer,
});

const mapDispatchToProps = (dispatch) => ({
  uploadImage: () => dispatch(openModal('USER_UPLOAD_IMAGE', {})),
  loadEmployer: (id) => dispatch(loadingEmployerStart(id)),
  updateEmployer: (data) => dispatch(updateEmployerStart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);
