import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { checkUserSession } from '../../redux/user/user.action';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './../../redux/user/user.selectors';
import { UserIcon } from '@heroicons/react/solid';
import { AiOutlineCheck } from 'react-icons/ai';
import EmailCheckList from './email-check-list.component';
import { Link } from 'react-router-dom';

const UserProfile = ({ user }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
    return () => {};
  }, [dispatch]);

  return (
    <div className="w-full flex items-center justify-center p-2">
      <div className="text-gray-600 grid md:grid-cols-12 gap-6 w-full max-w-4xl">
        <div className="bg-white shadow-lg p-4 rounded-lg col-span-7 md:col-span-5">
          <div className="flex items-center my-4">
            <div className="flex items-center flex-col">
              {user?.imageUrl ? (
                <img
                  className="w-24 h-24 rounded-full"
                  src={user?.imageUrl}
                  alt="avatar"
                />
              ) : (
                <UserIcon className="p-2 w-24 h-24 text-white rounded-full bg-gray-400" />
              )}
              <p className="leading-4 text-xs font-mono cursor-pointer">
                Cập nhật ảnh
              </p>
            </div>

            <div className="ml-4">
              Xin chào,
              <div className="line-clamp-1 text-2xl font-semibold italic">
                <p>{user?.name}</p>
              </div>
              {user?.verify ? (
                <div className="text-green-500">
                  Đã xác thực <AiOutlineCheck />
                </div>
              ) : (
                <>
                  <p className="text-red-600 font-sans text-sm">
                    Tài khoản chưa được xác thực
                  </p>
                  <Link
                    to="/verify"
                    className="font-sans text-sm text-indigo-500 hover:text-indigo-400 cursor-pointer"
                  >
                    Xác thực ngay
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="my-2">
            <p className="text-lg">Email</p>
            <p>{user?.email}</p>
          </div>
          <div className="text-indigo-500 hover:text-indigo-400 cursor-pointer">
            Thay đổi mật khẩu
          </div>
        </div>
        <div className="col-span-7 bg-white shadow-lg p-4 rounded-lg">
          <div className="border-2 border-dashed px-4 py-2 rounded-lg my-4">
            Cài đặt thông báo từ hệ thống
          </div>
          <EmailCheckList />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

export default connect(mapStateToProps)(UserProfile);
