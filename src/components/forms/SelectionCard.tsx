import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface SelectionCardProps {
  label: string;
  // We can pass a string emoji like '💍' or a custom SVG/Image component
  icon: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export const SelectionCard: React.FC<SelectionCardProps> = ({
  label,
  icon,
  selected = false,
  onClick,
  className = ''
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center justify-between px-5 py-4 rounded-[14px] border transition-all duration-200 ${
        selected 
          ? 'border-primary bg-[#f2f7f4]' // Very subtle green tint when selected
          : 'border-gray-200 bg-transparent hover:bg-gray-50'
      } ${className}`}
    >
      <div className="flex items-center gap-4">
        {/* Render the emoji or custom icon */}
        <span className="text-2xl flex items-center justify-center">
          {icon}
        </span>
        <span className="text-[15px] font-medium text-gray-900">{label}</span>
      </div>
      
      {/* Checkmark icon only shows when selected */}
      {selected ? (
        <CheckCircle2 
          className="w-[22px] h-[22px] text-white fill-primary" 
        />
      ) : (
        // An invisible placeholder to keep the text perfectly aligned even when not selected
        <div className="w-[22px] h-[22px]" />
      )}
    </button>
  );
};
