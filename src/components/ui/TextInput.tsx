import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
}

export const TextInput: React.FC<TextInputProps> = ({ 
  label, 
  icon: Icon, 
  className = '', 
  ...props 
}) => {
  return (
    <div className="flex flex-col space-y-2 w-full text-left">
      <label className="text-[15px] font-medium text-gray-900">
        {label}
      </label>
      <div className="relative">
        {/* Render the icon with a thinner stroke to match Figma */}
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-600">
            <Icon size={20} strokeWidth={1.5} />
          </div>
        )}
        <input 
          className={`w-full rounded-[14px] border border-gray-300 bg-transparent px-4 py-3.5 text-gray-900 placeholder:text-gray-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all ${Icon ? 'pl-12' : ''} ${className}`}
          {...props}
        />
      </div>
    </div>
  );
};
