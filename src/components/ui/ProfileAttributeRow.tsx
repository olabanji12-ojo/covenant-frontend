import React from 'react';

export interface ProfileAttributeRowProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

export const ProfileAttributeRow: React.FC<ProfileAttributeRowProps> = ({ icon, title, value }) => {
  return (
    <div className="w-full flex items-center justify-between py-3.5">
      <div className="flex items-center gap-3">
        <div className="text-gray-900 w-5 flex justify-center">
          {icon}
        </div>
        <span className="font-bold text-[14px] text-gray-900 leading-snug max-w-[100px]">{title}</span>
      </div>
      <span className="text-[13px] text-gray-500 font-medium text-right">{value}</span>
    </div>
  );
};
