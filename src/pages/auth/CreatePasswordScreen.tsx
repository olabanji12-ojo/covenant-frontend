import React, { useState } from 'react';
import { TextInput } from '../../components/ui/TextInput';
import { PasswordInput } from '../../components/ui/PasswordInput';
import { Button } from '../../components/ui/Button';
import { Mail, CheckCircle2 } from 'lucide-react';

export const CreatePasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const rules = [
    "At least 8 characters",
    "One uppercase letter",
    "One number",
    "One special character"
  ];

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
          
          {/* Our PasswordInput already has the lock icon and visibility toggle built right in! */}
          <PasswordInput 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Password Rules Checklist */}
        <div className="w-full flex flex-col space-y-4 px-2">
          {rules.map((rule, index) => (
            <div key={index} className="flex items-center gap-3">
              {/* Using fill-primary and text-white creates the solid green circle with a white checkmark! */}
              <CheckCircle2 
                size={20} 
                className="text-white fill-primary" 
              />
              <span className="text-[14.5px] font-medium text-[#1a3322]">
                {rule}
              </span>
            </div>
          ))}
        </div>

        {/* Footer Section */}
        {/* mt-auto automatically eats up all available empty space above it, pushing the button to the bottom! */}
        <div className="mt-auto pt-10 pb-4 w-full">
          <Button variant="primary">
            Continue
          </Button>
        </div>

      </div>
    </div>
  );
};
