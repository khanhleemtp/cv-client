import LogoApp from '../../components/logo/logo.component';
import SignInAndSignUp from '../../components/sign-in-and-sign-up/sign-in-and-sign-up.component';

const SignInAndSignUpPage = () => {
  return (
    <div className="flex items-center justify-center relative min-h-screen">
      <div className="absolute inset-6 transform -translate-y-1/2 w-32 h-8">
        <LogoApp />
      </div>
      <SignInAndSignUp />
    </div>
  );
};

export default SignInAndSignUpPage;
