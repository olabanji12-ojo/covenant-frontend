import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput } from '../../components/ui/TextInput';
import { PillToggle } from '../../components/forms/PillToggle';
import { Button } from '../../components/ui/Button';
import { User, Calendar } from 'lucide-react';

export const CreateAccountForm = () => {
  const navigate = useNavigate();
  // We use React state to track the form inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('man');
  const [interestedIn, setInterestedIn] = useState('woman');
  const [formError, setFormError] = useState('');

  const handleContinue = () => {
    setFormError('');
    if (!firstName.trim() || !lastName.trim() || !dob.trim()) {
      setFormError('Please fill in your first name, last name, and date of birth.');
      return;
    }
    navigate('/create-password', {
      state: { firstName, lastName, dob, gender, interestedIn }
    });
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0] flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-sm flex flex-col items-center">
        
        {/* Header Section */}
        <h1 className="text-[26px] font-bold text-gray-900 mb-2 text-center mt-8">
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
        <Button variant="primary" className="mt-10" onClick={handleContinue}>
          Continue
        </Button>
        
        <p className="text-[15px] text-gray-500 mt-8 mb-12">
          Already have an account? <span onClick={() => navigate('/app/discover')} className="text-primary font-medium cursor-pointer hover:underline">Log in</span>
        </p>

      </div>
    </div>
  );
};
