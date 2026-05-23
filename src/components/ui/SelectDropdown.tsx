import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectDropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  placeholder?: string;
  options: { value: string; label: string }[];
}

export const SelectDropdown: React.FC<SelectDropdownProps> = ({ 
  label, 
  placeholder = "Select",
  options, 
  className = '', 
  ...props 
}) => {
  return (
    <div className="flex flex-col space-y-2 w-full text-left">
      <label className="text-[15px] font-medium text-gray-900">
        {label}
      </label>
      <div className="relative">
        <select 
          // `appearance-none` removes the browser's default dropdown arrow so we can use our own Lucide icon
          className={`w-full appearance-none rounded-[14px] border border-gray-300 bg-transparent px-4 py-3.5 pr-10 text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all cursor-pointer ${className}`}
          defaultValue=""
          {...props}
        >
          <option value="" disabled hidden>{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {/* Custom Chevron icon aligned to the right */}
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-500">
          <ChevronDown size={20} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
};
