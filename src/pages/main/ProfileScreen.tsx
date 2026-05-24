import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Settings, CheckCircle2, Bell, Lock, Crown, LogOut } from 'lucide-react';
import { BottomNavBar } from '../../components/navigation/BottomNavBar';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { logout } from '../../store/authSlice';
import { ConfirmModal } from '../../components/ui/ConfirmModal';

// ==========================================
// REUSABLE COMPONENT: SettingsRow
// ==========================================
interface SettingsRowProps {
  icon: React.ReactNode;
  title: string;
  rightText?: string;
  rightTextColor?: string;
  isPremium?: boolean;
  onClick?: () => void;
}

const SettingsRow: React.FC<SettingsRowProps> = ({ icon, title, rightText, rightTextColor, isPremium, onClick }) => {
  // The Premium row has a completely different design!
  if (isPremium) {
    return (
      // We use negative margins to make the premium pill slightly wider than the standard list items, just like your design!
      <div 
        onClick={onClick}
        className="w-[calc(100%+24px)] -ml-3 bg-[#fdfaf0] rounded-[16px] flex items-center justify-between px-5 py-4 mb-2 cursor-pointer shadow-sm mt-4"
      >
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
    <div 
      onClick={onClick}
      className="w-full flex items-center justify-between py-4 border-b border-gray-200 last:border-0 cursor-pointer hover:opacity-70 transition-opacity"
    >
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
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  // Helper to calculate age from DOB
  const age = React.useMemo(() => {
    const dobString = user?.dob;
    if (!dobString) return '29'; // Fallback
    const dob = new Date(dobString);
    const diff_ms = Date.now() - dob.getTime();
    const age_dt = new Date(diff_ms); 
    return Math.abs(age_dt.getUTCFullYear() - 1970).toString();
  }, [user]);

  const name = user ? `${user.first_name || ''}`.trim() : 'N/A';
  const avatar = user?.photos && user.photos.length > 0 ? user.photos[0] : '/male1.png';

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f5f0] w-full max-w-sm mx-auto relative overflow-hidden pb-28">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-10 pb-6 w-full shrink-0">
        <button onClick={() => navigate(-1)} className="text-gray-900 hover:opacity-70 transition-opacity -ml-1">
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
              src={avatar} 
              alt={name} 
              className="w-full h-full rounded-full object-cover shadow-sm bg-white"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-1.5">
              <h2 className="text-[18px] font-bold text-gray-900 leading-none">{name}, {age}</h2>
              {/* Note: I'm using a white checkmark inside a green circle to match the design perfectly */}
              <CheckCircle2 size={16} className="text-[#f7f5f0] fill-[#1a3322]" />
            </div>
            <p 
              onClick={() => navigate('/app/profile-detail')}
              className="text-[11px] font-bold text-gray-500 cursor-pointer hover:underline">
              View Profile.
            </p>
          </div>
        </div>

        {/* Settings List */}
        <div className="flex flex-col w-full px-8 pb-6">
          {/* 
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
          */}
          <SettingsRow 
            icon={<Bell size={22} strokeWidth={1.5} />} 
            title="Notification Settings" 
          />
          <SettingsRow 
            icon={<Lock size={22} strokeWidth={1.5} />} 
            title="Privacy & Safety" 
          />
          {/*
          <SettingsRow 
            icon={<Headset size={22} strokeWidth={1.5} />} 
            title="Help Center" 
          />
          <SettingsRow 
            icon={<UserPlus size={22} strokeWidth={1.5} />} 
            title="Invite a Friend" 
          />
          */}
          
          <SettingsRow 
            icon={<Crown size={22} strokeWidth={2.5} />} 
            title="Get Premium" 
            rightText="Upgrade"
            isPremium={true}
          />
          
          <SettingsRow 
            icon={<LogOut size={22} className="text-red-500" strokeWidth={1.5} />} 
            title="Log Out" 
            rightTextColor="text-red-500"
            onClick={() => setIsLogoutOpen(true)}
          />
        </div>

      </div>

      {/* Bottom Nav Bar */}
      <BottomNavBar />

      {/* Confirm Logout Modal */}
      <ConfirmModal
        isOpen={isLogoutOpen}
        title="Log out of Church-Match?"
        message="Are you sure you want to log out of your account? You will need to enter your email and password to log back in."
        confirmText="Yes, Log Out"
        cancelText="Cancel"
        isDestructive={true}
        onConfirm={() => {
          setIsLogoutOpen(false);
          dispatch(logout());
          navigate('/');
        }}
        onCancel={() => setIsLogoutOpen(false)}
      />
      
    </div>
  );
};
