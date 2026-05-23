import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface ProfileDetailRowProps {
  icon?: LucideIcon | React.ElementType | string;
  label: string;
  value: string;
  className?: string;
}

export const ProfileDetailRow: React.FC<ProfileDetailRowProps> = ({
  icon: Icon,
  label,
  value,
  className = ''
}) => {
  return (
    <div className={`flex items-start w-full py-2.5 ${className}`}>
      {/* Left side: Icon and Label (Fixed width so the values all line up perfectly) */}
      <div className="flex items-center gap-3 w-[160px] flex-shrink-0">
        <div className="w-5 h-5 flex items-center justify-center">
          {typeof Icon === 'string' ? (
            <img src={Icon} alt={label} className="w-4 h-4 object-contain" />
          ) : Icon ? (
            <Icon className="w-[18px] h-[18px] text-gray-900" strokeWidth={2} />
          ) : null}
        </div>
        <span className="text-[15px] font-semibold text-gray-900">{label}</span>
      </div>
      
      {/* Right side: The Value text */}
      <div className="flex-1 text-[15px] text-gray-500 pt-0.5">
        {value}
      </div>
    </div>
  );
};
