import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signOutStart } from './../../redux/user/user.action';

const SignOut = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(signOutStart());
  }, [dispatch]);
  return null;
};

export default SignOut;
