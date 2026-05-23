import { SocialAuthButton } from '../../components/forms/SocialAuthButton';

export const SignUpOptions = () => {
  return (
    <div className="min-h-screen bg-[#f7f5f0] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm flex flex-col items-center">
        
        {/* Header Section */}
        <h1 className="text-[26px] font-bold text-gray-900 mb-6 text-center">
          Create Account
        </h1>
        <p className="text-[15px] text-gray-500 text-center mb-12 leading-relaxed">
          Choose how you'd like to<br />get started
        </p>

        {/* Buttons Section - Because we built the SocialAuthButton earlier, this is pure magic! */}
        <div className="w-full space-y-4">
          <SocialAuthButton provider="Google" icon="/google 1.svg" />
          <SocialAuthButton provider="Apple" icon="/apple-logo 1.svg" />
          <SocialAuthButton provider="Facebook" icon="/communication 1.svg" />
          <SocialAuthButton provider="Email" icon="/email (1) 1.svg" />
        </div>

        {/* Footer Section */}
        <p className="text-[13px] text-gray-500 text-center mt-12 mb-10">
          We'll never post to any of your accounts.
        </p>
        <p className="text-[15px] text-gray-500">
          Already have an account? <span className="text-primary font-medium cursor-pointer hover:underline">Log in</span>
        </p>

      </div>
    </div>
  );
};
