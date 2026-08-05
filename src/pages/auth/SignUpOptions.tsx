import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SocialAuthButton } from '../../components/forms/SocialAuthButton';
import { Button } from '../../components/ui/Button'; // Assuming you have this
import { socialLoginUser, guestLoginUser } from '../../store/authSlice';
import type { AppDispatch } from '../../store';
import { useGoogleLogin } from '@react-oauth/google';

export const SignUpOptions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const resultAction = await dispatch(socialLoginUser({ provider: 'google', token: tokenResponse.access_token }));
        if (socialLoginUser.fulfilled.match(resultAction)) {
          const user = resultAction.payload.user;
          // If the user doesn't have a valid DOB, they need to complete onboarding
          if (!user.dob || new Date(user.dob).getFullYear() <= 1970) {
            navigate('/create-account');
          } else {
            navigate('/app/discover');
          }
        } else {
          console.error('Google login failed:', resultAction.payload);
        }
      } catch (err) {
        console.error(err);
      }
    },
    onError: error => console.error('Google login error', error)
  });

  const handleSocialClick = async (provider: string) => {
    if (provider === 'Google') {
      loginWithGoogle();
      return;
    }
    try {
      // For other providers not fully implemented yet
      const resultAction = await dispatch(socialLoginUser({ provider: provider.toLowerCase(), token: 'dummy_token' }));
      if (socialLoginUser.fulfilled.match(resultAction)) {
        navigate('/app/discover');
      } else {
        console.error('Social login failed:', resultAction.payload);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGuestClick = async () => {
    try {
      const resultAction = await dispatch(guestLoginUser());
      if (guestLoginUser.fulfilled.match(resultAction)) {
        navigate('/app/discover');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0] flex flex-col items-center py-12 px-6 md:justify-center">
      <div className="w-full max-w-sm flex flex-col flex-1 md:flex-none md:bg-white md:p-10 md:rounded-[32px] md:shadow-sm md:border md:border-gray-100">
        
        {/* Header Section */}
        <h1 className="text-[26px] font-bold text-gray-900 mb-6 text-center">
          Create Account
        </h1>
        <p className="text-[15px] text-gray-500 text-center mb-12 leading-relaxed">
          Choose how you'd like to<br />get started
        </p>

        {/* Buttons Section - Wired to our API! */}
        <div className="w-full space-y-4">
          <SocialAuthButton onClick={() => handleSocialClick('Google')} provider="Google" icon="/google 1.svg" />
          <SocialAuthButton onClick={() => navigate('/create-account')} provider="Email" icon="/email (1) 1.svg" />
          
          <div className="pt-4">
             <Button variant="secondary" onClick={handleGuestClick} className="w-full">
               Explore as Guest
             </Button>
          </div>
        </div>

        {/* Footer Section */}
        <p className="text-[13px] text-gray-500 text-center mt-12 mb-10">
          We'll never post to any of your accounts.
        </p>
        <p className="text-[15px] text-gray-500">
          Already have an account? <span onClick={() => navigate('/login')} className="text-primary font-medium cursor-pointer hover:underline">Log in</span>
        </p>

      </div>
    </div>
  );
};
