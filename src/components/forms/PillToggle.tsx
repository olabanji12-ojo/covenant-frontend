import React from 'react';
import type { LucideIcon } from 'lucide-react';

export interface ToggleOption {
  value: string;
  label: string;
  icon?: LucideIcon | React.ElementType | string;
}

interface PillToggleProps {
  label?: string;
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const PillToggle: React.FC<PillToggleProps> = ({
  label,
  options,
  value,
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex flex-col space-y-2 w-full text-left ${className}`}>
      {label && (
        <label className="text-[15px] font-medium text-gray-900">
          {label}
        </label>
      )}
      {/* We use a grid or flex to lay the options out side-by-side */}
      <div className="flex gap-3">
        {options.map((opt) => {
          const isActive = value === opt.value;
          const Icon = opt.icon;
          
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-[14px] border outline-none transition-all ${
                isActive 
                  ? 'border-primary bg-primary/5 ring-1 ring-primary' // Active state (green border)
                  : 'border-gray-300 bg-transparent hover:bg-gray-50' // Inactive state (gray border)
              }`}
            >
              {typeof Icon === 'string' ? (
                <img 
                  src={Icon} 
                  alt={opt.label} 
                  className={`w-5 h-5 object-contain transition-opacity ${isActive ? 'opacity-100' : 'opacity-50'}`} 
                />
              ) : Icon ? (
                <Icon 
                  size={20} 
                  strokeWidth={1.5} 
                  className={isActive ? 'text-primary' : 'text-gray-500'} 
                />
              ) : null}
              <span className="font-medium text-gray-900 text-[15px]">
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
