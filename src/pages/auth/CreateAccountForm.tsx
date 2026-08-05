import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput } from '../../components/ui/TextInput';
import { PillToggle } from '../../components/forms/PillToggle';
import { Button } from '../../components/ui/Button';
import { User, Calendar } from 'lucide-react';
import { updateUserProfile } from '../../store/authSlice';
import type { AppDispatch, RootState } from '../../store';

export const CreateAccountForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);

  // We use React state to track the form inputs
  const [firstName, setFirstName] = useState(user?.first_name || '');
  const [lastName, setLastName] = useState(user?.last_name || '');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('man');
  const [interestedIn, setInterestedIn] = useState('woman');
  const [formError, setFormError] = useState('');

  // Update state if user loads after component mounts
  useEffect(() => {
    if (user?.first_name) setFirstName(user.first_name);
    if (user?.last_name) setLastName(user.last_name);
  }, [user]);

  const handleContinue = async () => {
    setFormError('');
    if (!firstName.trim() || !lastName.trim() || !dob.trim()) {
      setFormError('Please fill in your first name, last name, and date of birth.');
      return;
    }

    if (isAuthenticated) {
      // Social login flow: skip password, just update profile directly!
      try {
        let parsedDob = new Date(dob);
        const resultAction = await dispatch(updateUserProfile({
          first_name: firstName,
          last_name: lastName,
          dob: parsedDob.toISOString(),
          gender: gender as any,
          interested_in: interestedIn as any
        }));
        
        if (updateUserProfile.fulfilled.match(resultAction)) {
          navigate('/faith-profile', {
            state: { firstName, lastName, dob, gender, interestedIn }
          });
        } else {
          setFormError('Failed to save profile details. Please try again.');
        }
      } catch (err) {
        console.error(err);
        setFormError('An error occurred. Please try again.');
      }
    } else {
      // Normal flow: go to password creation screen
      navigate('/create-password', {
        state: { firstName, lastName, dob, gender, interestedIn }
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0] flex flex-col items-center py-12 px-6 md:justify-center">
      <div className="w-full max-w-sm flex flex-col flex-1 md:flex-none md:bg-white md:p-10 md:rounded-[32px] md:shadow-sm md:border md:border-gray-100">
        
        {/* Header Section */}
        <h1 className="text-[26px] font-bold text-gray-900 mb-2 text-center mt-8 md:mt-0">
          Create Account
        </h1>
        <p className="text-[15px] text-gray-500 text-center mb-10 leading-snug">
          Let's get to know you.
        </p>

        {formError && (
          <div className="w-full bg-red-50 text-red-600 text-[13px] font-medium p-3 rounded-lg mb-6 text-center border border-red-100">
            {formError}
          </div>
        )}

        {/* Form Section */}
        <div className="w-full space-y-5">
          <TextInput 
            label="First name" 
            placeholder="Enter your first name" 
            icon={User}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          
          <TextInput 
            label="Last name" 
            placeholder="Enter your last name" 
            icon={User}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <TextInput 
            type="date"
            label="Date of Birth" 
            placeholder="MM/ DD/ YYYY" 
            icon={Calendar}
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />

          {/* Gender Toggle using the custom SVGs you downloaded! */}
          <PillToggle
            label="I am a"
            value={gender}
            onChange={setGender}
            options={[
              { value: 'man', label: 'Man', icon: '/user (9) 1.svg' },
              { value: 'woman', label: 'Woman', icon: '/woman 1.svg' }
            ]}
          />

          {/* Interested In Toggle */}
          <PillToggle
            label="Interested in"
            value={interestedIn}
            onChange={setInterestedIn}
            options={[
              { value: 'woman', label: 'Woman', icon: '/woman 1.svg' },
              { value: 'man', label: 'Man', icon: '/user (9) 1.svg' }
            ]}
          />
        </div>

        {/* Footer Section */}
        <Button variant="primary" className="mt-10" onClick={handleContinue} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Continue'}
        </Button>
        
        {/* Only show login link for normal non-social flow */}
        {!isAuthenticated && (
          <p className="text-[15px] text-gray-500 mt-8 mb-12">
            Already have an account? <span onClick={() => navigate('/login')} className="text-primary font-medium cursor-pointer hover:underline">Log in</span>
          </p>
        )}

      </div>
    </div>
  );
};
