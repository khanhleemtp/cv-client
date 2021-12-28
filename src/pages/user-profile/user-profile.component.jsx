import NavContainer from './../../components/nav-container/nav-container.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './../../redux/user/user.selectors';
import Button from './../../components/button/button.component';

const UserProfilePage = ({ user }) => {
  return (
    <NavContainer>
      <div className=""></div>
      <div className="container max-w-2xl mx-auto mt-4 p-4">
        <div>
          <div className="text-2xl">Thông tin</div>
          <div className="my-3">Email: {user?.email}</div>
          <div className="my-3">Tên: {user?.name}</div>
          <div className="flex flex-col w-36">
            <Button
              text="Xác thực"
              size="small"
              className="mt-2 bg-green-500 hover:bg-green-600"
              disabled={user?.verify}
            />
            <Button text="Đổi mật khẩu" size="small" className="mt-2" />
          </div>
        </div>
      </div>
    </NavContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

export default connect(mapStateToProps)(UserProfilePage);
