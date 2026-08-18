import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Loader2 } from 'lucide-react';

interface SocialAuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  provider: 'Google' | 'Apple' | 'Facebook' | 'Email';
  icon?: LucideIcon | React.ElementType | string;
  isLoading?: boolean;
}

export const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({
  provider,
  icon: Icon,
  className = '',
  isLoading = false,
  disabled,
  ...props
}) => {
  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      className={`relative flex w-full items-center justify-center rounded-lg border border-gray-300 bg-transparent py-3.5 px-4 text-[15px] font-medium text-gray-900 transition-all hover:bg-gray-50 active:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {/* Icon locked to the left side using absolute positioning */}
      <div className="absolute left-4 flex items-center justify-center w-6 h-6">
        {isLoading ? (
          <Loader2 className="w-5 h-5 text-gray-700 animate-spin" />
        ) : typeof Icon === 'string' ? (
          <img src={Icon} alt={`${provider} icon`} className="w-5 h-5 object-contain" />
        ) : Icon ? (
          <Icon className="w-5 h-5 text-gray-900" />
        ) : null}
      </div>
      
      {/* Text perfectly centered in the button */}
      <span>{isLoading ? `Connecting to ${provider}...` : `Continue with ${provider}`}</span>
    </button>
  );
};

