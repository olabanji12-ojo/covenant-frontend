import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({ 
  label = "Password", 
  className = '', 
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col space-y-2 w-full text-left">
      <label className="text-[15px] font-medium text-gray-900">
        {label}
      </label>
      <div className="relative">
        {/* Left side lock icon */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-600">
          <Lock size={20} strokeWidth={1.5} />
        </div>
        
        <input 
          type={showPassword ? "text" : "password"}
          className={`w-full rounded-[14px] border border-gray-300 bg-transparent pl-12 pr-12 py-3.5 text-gray-900 placeholder:text-gray-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all ${className}`}
          {...props}
        />

        {/* Right side visibility toggle button */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
        >
          {showPassword ? (
            <Eye size={20} strokeWidth={1.5} />
          ) : (
            <EyeOff size={20} strokeWidth={1.5} />
          )}
        </button>
      </div>
    </div>
  );
};
