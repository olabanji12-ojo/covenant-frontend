import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput } from '../../components/ui/TextInput';
import { PasswordInput } from '../../components/ui/PasswordInput';
import { Button } from '../../components/ui/Button';
import { Mail } from 'lucide-react';
import { loginUser } from '../../store/authSlice';
import type { AppDispatch, RootState } from '../../store';

export const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) return;
    
    try {
      const resultAction = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(resultAction)) {
        navigate('/app/discover');
      }
    } catch (err) {
      console.error('Failed to login:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0] flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-sm flex flex-col flex-1">
        
        <div className="flex flex-col items-center mt-8 mb-10">
          <h1 className="text-[26px] font-bold text-gray-900 mb-2 text-center">
            Welcome Back
          </h1>
          <p className="text-[15px] text-gray-500 text-center">
            Sign in to continue.
          </p>
        </div>

        <div className="w-full space-y-6">
          {/* Display backend API errors */}
          {error && (
            <div className="w-full bg-red-50 text-red-600 text-[13px] font-medium p-3 rounded-lg text-center border border-red-100">
              {error}
            </div>
          )}

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

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
        </div>

        <div className="mt-auto pt-10 pb-4 w-full">
          <Button variant="primary" onClick={handleLogin} disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </div>

        <p className="text-[15px] text-gray-500 mt-8 mb-12 text-center">
          Don't have an account? <span onClick={() => navigate('/signup')} className="text-primary font-medium cursor-pointer hover:underline">Sign up</span>
        </p>

      </div>
    </div>
  );
};
