import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { ChevronLeft, MoreHorizontal, CheckCircle2, Church, ArrowUpRight, BookOpen, Heart } from 'lucide-react';
import { ConfirmModal } from '../../components/ui/ConfirmModal';
import { ProfileAttributeRow } from '../../components/ui/ProfileAttributeRow';



export const UserProfileDetailScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authUser = useSelector((state: RootState) => state.auth.user);
  
  const isMatch = location.state?.isMatch;
  const user = isMatch ? location.state?.user : authUser;

  // Helper to calculate age from DOB
  const age = React.useMemo(() => {
    const dobString = user?.date_of_birth || (user as any)?.dob;
    if (!dobString) return '29'; // Fallback
    const dob = new Date(dobString);
    const diff_ms = Date.now() - dob.getTime();
    const age_dt = new Date(diff_ms); 
    return Math.abs(age_dt.getUTCFullYear() - 1970).toString();
  }, [user]);

  const name = user ? `${(user as any).first_name || ''}`.trim() || user.name : 'N/A';
  const avatar = user?.photos && user.photos.length > 0 ? user.photos[0] : '/male1.png';
  const bio = user?.bio || 'I love jesus, my family, coffee, and adventures.\nLooking for a godly partner to build Christ-centered life together.';
  const denomination = user?.denomination || 'Not specified';
  const faith = user?.prayer_frequency || 'Growing';
  const bible = user?.bible_reading || 'Daily';
  const intentions = user?.intentions || (user as any)?.interested_in || 'Marriage';

  const [isUnmatchOpen, setIsUnmatchOpen] = useState(false);

  return (
    // Note: No Bottom Nav Bar on this detailed sub-screen!
    <div className="flex flex-col min-h-screen bg-[#f7f5f0] w-full max-w-sm mx-auto overflow-y-auto custom-scrollbar pb-8">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-10 pb-6 w-full shrink-0">
        <button onClick={() => navigate(-1)} className="text-gray-900 hover:opacity-70 transition-opacity -ml-1">
          <ChevronLeft size={24} strokeWidth={1.5} />
        </button>
        
        <div className="flex items-center gap-1.5">
          <h1 className="text-[18px] font-bold text-[#1a3322] leading-none mt-0.5">{name}, {age}</h1>
          {/* Using a white checkmark inside a dark green background to match the design perfectly */}
          <CheckCircle2 size={18} className="text-[#f7f5f0] fill-[#1a3322]" />
        </div>

        {isMatch && (
          <button 
            onClick={() => setIsUnmatchOpen(true)}
            className="text-gray-900 hover:opacity-70 transition-opacity -mr-1"
          >
            <MoreHorizontal size={24} strokeWidth={1.5} />
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center w-full px-8">
        
        {/* Large Avatar */}
        <div className="w-[170px] h-[170px] shrink-0 mb-8 mt-2">
          {/* Using male1.png as the main avatar */}
          <img 
            src={avatar} 
            alt={name} 
            className="w-full h-full rounded-full object-cover shadow-sm bg-white"
          />
        </div>

        {/* About Me Section */}
        <div className="w-full flex flex-col mb-8">
          <h2 className="text-[15px] font-bold text-gray-900 mb-2">About me</h2>
          <p className="text-[12px] text-gray-500 font-medium leading-snug pr-4 whitespace-pre-line">
            {bio}
          </p>
        </div>

        {/* Faith Attributes List */}
        <div className="w-full flex flex-col mb-12">
          <ProfileAttributeRow 
            icon={<Church size={18} strokeWidth={2} />} 
            title="Church" 
            value={denomination} 
          />
          <ProfileAttributeRow 
            icon={<ArrowUpRight size={18} strokeWidth={2} />} 
            title="Faith" 
            value={faith} 
          />
          <ProfileAttributeRow 
            icon={<BookOpen size={18} strokeWidth={2} />} 
            title="Bible Study" 
            value={bible} 
          />
          <ProfileAttributeRow 
            icon={<Heart size={18} strokeWidth={2.5} className="fill-[#1a3322]" />} 
            title="Relationship Goal" 
            value={intentions} 
          />
        </div>

        {/* Bottom Action Buttons */}
        <div className="w-full flex flex-col gap-3 mt-auto mb-2">
          {isMatch && (
            <button 
              onClick={() => navigate(`/app/chat/${user.id}`, { state: { matchUser: user } })}
              className="flex-1 bg-[#1a3322] text-white font-bold text-[15px] py-4 rounded-full shadow-md hover:scale-[1.02] transition-transform flex items-center justify-center">
              Send Message
            </button>
          )}
          {!isMatch && (
            <button 
              onClick={() => navigate('/app/profile')}
              className="w-full bg-[#1a3322] text-white font-medium rounded-full py-[14px] shadow-md hover:bg-[#122418] transition-colors">
              Edit Profile
            </button>
          )}
          <button 
            onClick={() => navigate(-1)}
            className="w-full border border-gray-300 text-gray-600 font-medium rounded-full py-[14px] hover:bg-gray-100 transition-colors">
            Go Back
          </button>
        </div>

      </div>

      {/* Confirm Unmatch Modal */}
      <ConfirmModal
        isOpen={isUnmatchOpen}
        title={`Unmatch with ${name}?`}
        message={`Are you sure you want to unmatch? You won't be able to connect or message with ${name} anymore and this action cannot be undone.`}
        confirmText="Yes, Unmatch"
        cancelText="Cancel"
        isDestructive={true}
        onConfirm={() => {
          setIsUnmatchOpen(false);
          navigate('/app/matches');
        }}
        onCancel={() => setIsUnmatchOpen(false)}
      />

    </div>
  );
};
