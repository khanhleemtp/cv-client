import NavContainer from './../../components/nav-container/nav-container.component';
import UserProfile from './../../components/user-profile/user-profile.component';
import UserProfileNav from './../../components/user-profile/user-profile-nav.component';

const UserProfilePage = () => {
  return (
    <NavContainer>
      <UserProfileNav />
      <UserProfile />
    </NavContainer>
  );
};

export default UserProfilePage;
