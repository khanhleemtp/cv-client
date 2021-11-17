import {
  GrFacebookOption,
  GrGooglePlus,
  GrLinkedinOption,
} from 'react-icons/gr';
import SocialButton from '../social-button/social-button.component';

const SignSocial = () => {
  return (
    <div className="flex items-center justify-around my-8">
      <SocialButton
        text="Google"
        icon={GrGooglePlus}
        bgColor="bg-red-500"
        textColor="text-red-500"
      />
      <SocialButton
        text="Facebook"
        icon={GrFacebookOption}
        bgColor="bg-blue-500"
        textColor="text-blue-500"
      />
      <SocialButton
        text="Linkedin"
        icon={GrLinkedinOption}
        bgColor="bg-blue-700"
        textColor="text-blue-700"
      />
    </div>
  );
};

export default SignSocial;
