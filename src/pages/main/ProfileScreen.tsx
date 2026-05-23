import React from 'react';
import { ChevronLeft, Settings, CheckCircle2, User, ShieldCheck, Bell, Lock, Headset, UserPlus, Crown } from 'lucide-react';
import { BottomNavBar } from '../../components/navigation/BottomNavBar';

// ==========================================
// REUSABLE COMPONENT: SettingsRow
// ==========================================
interface SettingsRowProps {
  icon: React.ReactNode;
  title: string;
  rightText?: string;
  rightTextColor?: string;
  isPremium?: boolean;
}

const SettingsRow: React.FC<SettingsRowProps> = ({ icon, title, rightText, rightTextColor, isPremium }) => {
  // The Premium row has a completely different design!
  if (isPremium) {
    return (
      // We use negative margins to make the premium pill slightly wider than the standard list items, just like your design!
      <div className="w-[calc(100%+24px)] -ml-3 bg-[#fdfaf0] rounded-[16px] flex items-center justify-between px-5 py-4 mb-2 cursor-pointer shadow-sm mt-4">
        <div className="flex items-center gap-4">
          <div className="text-[#1a3322]">
            {icon}
          </div>
          <span className="font-bold text-[14px] text-gray-900">{title}</span>
        </div>
        {rightText && (
          <span className="font-bold text-[13px] text-gray-900">{rightText}</span>
        )}
      </div>
    );
  }

  // Standard row design
  return (
    <div className="w-full flex items-center justify-between py-4 border-b border-gray-200 last:border-0 cursor-pointer hover:opacity-70 transition-opacity">
      <div className="flex items-center gap-4">
        <div className="text-gray-900">
          {icon}
        </div>
        <span className="font-bold text-[14px] text-gray-900">{title}</span>
      </div>
      {rightText && (
        <span className={`font-bold text-[13px] ${rightTextColor || 'text-gray-900'}`}>{rightText}</span>
      )}
    </div>
  );
};

export const ProfileScreen = () => {

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f5f0] w-full max-w-sm mx-auto relative overflow-hidden pb-28">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-10 pb-6 w-full shrink-0">
        <button className="text-gray-900 hover:opacity-70 transition-opacity -ml-1">
          <ChevronLeft size={24} strokeWidth={1.5} />
        </button>
        <h1 className="text-[20px] font-bold text-[#1a3322]">Profile</h1>
        <button className="text-gray-600 hover:opacity-70 transition-opacity -mr-1">
          <Settings size={22} strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col items-center w-full">
        
        {/* Profile Summary Area */}
        <div className="flex items-center justify-center gap-5 mb-10 mt-2 w-full px-6">
          <div className="w-[85px] h-[85px] shrink-0">
            {/* You requested male1.png! */}
            <img 
              src="/male1.png" 
              alt="John" 
              className="w-full h-full rounded-full object-cover shadow-sm bg-white"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-1.5">
              <h2 className="text-[18px] font-bold text-gray-900 leading-none">John, 29</h2>
              {/* Note: I'm using a white checkmark inside a green circle to match the design perfectly */}
              <CheckCircle2 size={16} className="text-[#f7f5f0] fill-[#1a3322]" />
            </div>
            <p className="text-[11px] font-bold text-gray-500 cursor-pointer hover:underline">
              View Profile.
            </p>
          </div>
        </div>

        {/* Settings List */}
        <div className="flex flex-col w-full px-8 pb-6">
          <SettingsRow 
            icon={<User size={22} strokeWidth={1.5} />} 
            title="My Account" 
          />
          <SettingsRow 
            icon={<ShieldCheck size={22} strokeWidth={1.5} />} 
            title="Verification" 
            rightText="Verification"
            rightTextColor="text-[#2a8b75]"
          />
          <SettingsRow 
            icon={<Bell size={22} strokeWidth={1.5} />} 
            title="Notification Settings" 
          />
          <SettingsRow 
            icon={<Lock size={22} strokeWidth={1.5} />} 
            title="Privacy & Safety" 
          />
          <SettingsRow 
            icon={<Headset size={22} strokeWidth={1.5} />} 
            title="Help Center" 
          />
          <SettingsRow 
            icon={<UserPlus size={22} strokeWidth={1.5} />} 
            title="Invite a Friend" 
          />
          
          <SettingsRow 
            icon={<Crown size={22} strokeWidth={2.5} />} 
            title="Get Premium" 
            rightText="Upgrade"
            isPremium={true}
          />
        </div>

      </div>

      {/* Bottom Nav Bar */}
      <BottomNavBar />
      
    </div>
  );
};
