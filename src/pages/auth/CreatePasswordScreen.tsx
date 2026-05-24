import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../store/authSlice';
import type { AppDispatch, RootState } from '../../store';
import { TextInput } from '../../components/ui/TextInput';
import { PasswordInput } from '../../components/ui/PasswordInput';
import { Button } from '../../components/ui/Button';
import { Mail, CheckCircle2 } from 'lucide-react';

export const CreatePasswordScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  // Retrieve the previous form state (firstName, lastName, etc.)
  const previousState = location.state || {};

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const isLengthValid = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const rules = [
    { text: "At least 8 characters", valid: isLengthValid },
    { text: "One uppercase letter", valid: hasUppercase },
    { text: "One number", valid: hasNumber },
    { text: "One special character", valid: hasSpecial }
  ];

  const isPasswordValid = isLengthValid && hasUppercase && hasNumber && hasSpecial;

  return (
    <div className="min-h-screen bg-[#f7f5f0] flex flex-col items-center py-12 px-6">
      {/* We use min-h-[calc(100vh-6rem)] to ensure the container spans the full height, allowing mt-auto to push the button to the very bottom */}
      <div className="w-full max-w-sm flex flex-col flex-1 min-h-[calc(100vh-6rem)]">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mt-8 mb-10">
          <h1 className="text-[26px] font-bold text-gray-900 mb-2 text-center">
            Create your password
          </h1>
          <p className="text-[15px] text-gray-500 text-center">
            Keep your accounts safe.
          </p>
        </div>

        {/* Form Inputs */}
        <div className="w-full space-y-6 mb-8">
          <TextInput 
            label="Email Address" 
            placeholder="yourmail@gmail.com" 
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <PasswordInput 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <PasswordInput 
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* Password Rules Checklist */}
        <div className="w-full flex flex-col space-y-4 px-2">
          {rules.map((rule, index) => (
            <div key={index} className="flex items-center gap-3">
              {/* Dynamic styling based on validity! */}
              <CheckCircle2 
                size={20} 
                className={`text-white transition-colors duration-300 ${rule.valid ? 'fill-primary' : 'fill-gray-300'}`} 
              />
              <span className={`text-[14.5px] font-medium transition-colors duration-300 ${rule.valid ? 'text-[#1a3322]' : 'text-gray-400'}`}>
                {rule.text}
              </span>
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <div className="mt-auto pt-10 pb-4 w-full flex flex-col gap-2">
          {/* Display local validation errors or backend API errors */}
          {(localError || error) && (
            <div className="w-full bg-red-50 text-red-600 text-[13px] font-medium p-3 rounded-lg text-center border border-red-100 mb-2">
              {localError || error}
            </div>
          )}

          <Button 
            variant="primary" 
            disabled={isLoading || !email || !isPasswordValid}
            onClick={async () => {
              setLocalError('');
              if (!email || !isPasswordValid) return;
              if (password !== confirmPassword) {
                setLocalError("Passwords do not match");
                return;
              }

              try {
                let parsedDob = new Date();
                if (previousState.dob) {
                  parsedDob = new Date(previousState.dob);
                }
                
                const userData = {
                  first_name: previousState.firstName || '',
                  last_name: previousState.lastName || '',
                  dob: parsedDob.toISOString(),
                  gender: previousState.gender || '',
                  interested_in: previousState.interestedIn || '',
                  email,
                  password: password
                };
                
                const resultAction = await dispatch(registerUser(userData));
                if (registerUser.fulfilled.match(resultAction)) {
                  navigate('/verify'); // Or /faith-profile depending on flow
                }
              } catch (err) {
                console.error("Failed to register:", err);
              }
            }}
          >
            {isLoading ? 'Creating Account...' : 'Continue'}
          </Button>
        </div>

      </div>
    </div>
  );
};
