import { useState } from 'react';
import SignIn from '../sign-in/sign-in.component';
import SignIntro from '../sign-intro/sign-intro.component';
import SignUp from '../sign-up/sign-up.component';

const SignInAndSignUp = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const onToggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };
  return (
    <>
      <SignIntro />
      {isLoginForm ? (
        <SignIn onToggleForm={onToggleForm} />
      ) : (
        <SignUp onToggleForm={onToggleForm} />
      )}
    </>
  );
};

export default SignInAndSignUp;
