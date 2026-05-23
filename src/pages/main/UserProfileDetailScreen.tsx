import React from 'react';
import { ChevronLeft, MoreHorizontal, CheckCircle2, Church, ArrowUpRight, BookOpen, Heart } from 'lucide-react';

// ==========================================
// REUSABLE COMPONENT: ProfileAttributeRow
// ==========================================
interface ProfileAttributeRowProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

const ProfileAttributeRow: React.FC<ProfileAttributeRowProps> = ({ icon, title, value }) => {
  return (
    <div className="w-full flex items-center justify-between py-3.5">
      <div className="flex items-center gap-3">
        <div className="text-gray-900 w-5 flex justify-center">
          {icon}
        </div>
        {/* max-w-[100px] ensures long titles like "Relationship Goal" wrap beautifully! */}
        <span className="font-bold text-[14px] text-gray-900 leading-snug max-w-[100px]">{title}</span>
      </div>
      <span className="text-[13px] text-gray-500 font-medium text-right">{value}</span>
    </div>
  );
};

export const UserProfileDetailScreen = () => {
  return (
    // Note: No Bottom Nav Bar on this detailed sub-screen!
    <div className="flex flex-col min-h-screen bg-[#f7f5f0] w-full max-w-sm mx-auto overflow-y-auto custom-scrollbar pb-8">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-10 pb-6 w-full shrink-0">
        <button className="text-gray-900 hover:opacity-70 transition-opacity -ml-1">
          <ChevronLeft size={24} strokeWidth={1.5} />
        </button>
        
        <div className="flex items-center gap-1.5">
          <h1 className="text-[18px] font-bold text-[#1a3322] leading-none mt-0.5">John, 29</h1>
          {/* Using a white checkmark inside a dark green background to match the design perfectly */}
          <CheckCircle2 size={18} className="text-[#f7f5f0] fill-[#1a3322]" />
        </div>

        <button className="text-gray-900 hover:opacity-70 transition-opacity -mr-1">
          <MoreHorizontal size={24} strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center w-full px-8">
        
        {/* Large Avatar */}
        <div className="w-[170px] h-[170px] shrink-0 mb-8 mt-2">
          {/* Using male1.png as the main avatar */}
          <img 
            src="/male1.png" 
            alt="John" 
            className="w-full h-full rounded-full object-cover shadow-sm bg-white"
          />
        </div>

        {/* About Me Section */}
        <div className="w-full flex flex-col mb-8">
          <h2 className="text-[15px] font-bold text-gray-900 mb-2">About me</h2>
          <p className="text-[12px] text-gray-500 font-medium leading-snug pr-4">
            I love jesus, my family, coffee, and adventures.<br />
            Looking for a godly partner to build Christ-<br />
            centered life together.
          </p>
        </div>

        {/* Faith Attributes List */}
        <div className="w-full flex flex-col mb-12">
          <ProfileAttributeRow 
            icon={<Church size={18} strokeWidth={2} />} 
            title="Church" 
            value="Baptist Church" 
          />
          <ProfileAttributeRow 
            icon={<ArrowUpRight size={18} strokeWidth={2} />} 
            title="Faith" 
            value="Very Committed" 
          />
          <ProfileAttributeRow 
            icon={<BookOpen size={18} strokeWidth={2} />} 
            title="Bible Study" 
            value="Daily" 
          />
          <ProfileAttributeRow 
            icon={<Heart size={18} strokeWidth={2.5} className="fill-[#1a3322]" />} 
            title="Relationship Goal" 
            value="Marriage" 
          />
        </div>

        {/* Bottom Action Button (Corrected typo from Figma: "proflie" -> "profile") */}
        <button className="w-full bg-[#1a3322] text-white font-medium rounded-full py-[14px] shadow-md hover:bg-[#122418] transition-colors mt-auto mb-2">
          Edit profile
        </button>

      </div>
    </div>
  );
};
