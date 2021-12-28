import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './../../redux/user/user.selectors';
import { UserIcon } from '@heroicons/react/solid';
// import EmailCheckList from './email-check-list.component';
import { Link } from 'react-router-dom';
import Button from './../button/button.component';
import { useForm, FormProvider } from 'react-hook-form';
import BaseSwitch from './../switch/BaseSwitch.component';

const UserProfile = ({ user }) => {
  const methods = useForm({
    defaultValues: {
      isFindJob: true,
      isEmployerFind: true,
    },
  });
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="text-gray-600 w-full p-4"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="bg-white">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center flex-col justify-center">
              {user?.imageUrl ? (
                <img
                  className="w-16 h-16 rounded-full"
                  src={user?.imageUrl}
                  alt="avatar"
                />
              ) : (
                <UserIcon className="p-2 w-16 h-16 text-white rounded-full bg-gray-400" />
              )}
              <p className="text-xs font-mono cursor-pointer">Cập nhật</p>
            </div>
            <div className="ml-4">
              Xin chào,
              <div className="line-clamp-1 text-xl font-semibold italic">
                <p>{user?.name}</p>
              </div>
              {user?.verify ? (
                <Button
                  text="Đã xác thực"
                  size="small"
                  className="bg-green-500 hover:bg-green-600"
                />
              ) : (
                <>
                  <Button
                    text="Chưa xác thực"
                    size="small"
                    className="bg-red-400 hover:bg-red-500 md:my-1"
                  />

                  <Link to="/verify">
                    <Button
                      text="Xác thực ngay"
                      size="small"
                      className="mx-2 md:mx-0 md:my-1"
                    />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="bg-white p-2">
          <BaseSwitch label={'Trạng thái tìm việc'} name="isFindJob" />

          <BaseSwitch
            label={'Cho phép nhà tuyển dụng tìm bạn'}
            name="isEmployerFind"
          />
        </div>
      </form>
    </FormProvider>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

export default connect(mapStateToProps)(UserProfile);
