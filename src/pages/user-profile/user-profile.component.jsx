import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { checkUserSession } from '../../redux/user/user.action';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './../../redux/user/user.selectors';
import NavContainer from './../../components/nav-container/nav-container.component';

const UserProfile = ({ user }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
    return () => {};
  }, [dispatch]);

  return (
    <NavContainer>
      <p className="line-clamp-6">{JSON.stringify(user)}</p>
    </NavContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

export default connect(mapStateToProps)(UserProfile);
