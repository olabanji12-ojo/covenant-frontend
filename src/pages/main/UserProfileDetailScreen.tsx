import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { ChevronLeft, MoreHorizontal, CheckCircle2, Church, ArrowUpRight, BookOpen, Heart, ShieldAlert, X } from 'lucide-react';
import { ConfirmModal } from '../../components/ui/ConfirmModal';
import { ProfileAttributeRow } from '../../components/ui/ProfileAttributeRow';
import { ReportModal } from '../../components/ui/ReportModal';
import { SwipeService } from '../../services/SwipeService';



export const UserProfileDetailScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authUser = useSelector((state: RootState) => state.auth.user);
  const user = location.state?.user || authUser;
  const isMatch = location.state?.isMatch;

  const [now] = useState(() => Date.now());

  // Helper to calculate age from DOB
  const age = React.useMemo(() => {
    const dobString = user?.date_of_birth || (user as any)?.dob;
    if (!dobString) return '29'; // Fallback
    const dob = new Date(dobString);
    const diff_ms = now - dob.getTime();
    const age_dt = new Date(diff_ms); 
    return Math.abs(age_dt.getUTCFullYear() - 1970).toString();
  }, [user, now]);

  const name = user ? `${(user as any).first_name || ''}`.trim() || user.name : 'N/A';
  const avatar = user?.photos && user.photos.length > 0 ? user.photos[0] : '/male1.png';
  const isCurrentUser = user?.id === authUser?.id;
  const bio = user?.bio || (isCurrentUser ? 'No bio added yet. Go to Edit Profile to add one!' : 'No bio added yet.');
  const denomination = user?.denomination || 'Not specified';
  const faith = user?.prayer_frequency || 'Growing';
  const bible = user?.bible_reading || 'Daily';
  const intention = user?.intention || (user as any)?.interested_in || 'Marriage';

  const [isUnmatchOpen, setIsUnmatchOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [showRequestSentModal, setShowRequestSentModal] = useState(false);

  const handleLike = async () => {
    if (!user?.id) return;
    if (authUser?.is_guest) {
      navigate('/signup');
      return;
    }
    try {
      const match = await SwipeService.likeUser(user.id);
      if (match && match.status === 'matched') {
        navigate('/app/match-success', { state: { matchUser: user } });
      } else {
        setShowRequestSentModal(true);
      }
    } catch (err) {
      console.error('Failed to like user:', err);
    }
  };

  const handlePass = async () => {
    if (!user?.id) return;
    if (authUser?.is_guest) {
      navigate('/signup');
      return;
    }
    try {
      await SwipeService.passUser(user.id);
      navigate(-1); // Go back to feed
    } catch (err) {
      console.error('Failed to pass user:', err);
    }
  };

  return (
    // Note: No Bottom Nav Bar on this detailed sub-screen!
    <div className="flex flex-col min-h-screen bg-[#f7f5f0] w-full max-w-sm md:max-w-2xl mx-auto overflow-y-auto custom-scrollbar pb-8 md:pb-6 md:bg-white md:shadow-sm md:border-x border-gray-100">
      
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

        <div className="flex items-center gap-3">
          {!isCurrentUser && (
            <button 
              onClick={() => setIsReportOpen(true)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <ShieldAlert size={22} strokeWidth={1.5} />
            </button>
          )}

          {isMatch && (
            <button 
              onClick={() => setIsUnmatchOpen(true)}
              className="text-gray-900 hover:opacity-70 transition-opacity -mr-1"
            >
              <MoreHorizontal size={24} strokeWidth={1.5} />
            </button>
          )}
        </div>
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
            value={intention} 
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
          
          {/* Edit Profile only shown if it's the current logged in user and NOT a match */}
          {!isMatch && isCurrentUser && (
            <button 
              onClick={() => navigate('/app/profile')}
              className="w-full bg-[#1a3322] text-white font-medium rounded-full py-[14px] shadow-md hover:bg-[#122418] transition-colors">
              Edit Profile
            </button>
          )}

          {/* Like/Pass buttons for candidates (not match, not self) */}
          {!isMatch && !isCurrentUser && (
            <div className="w-full flex justify-center gap-6 py-2">
              {/* Pass Button */}
              <div className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-90 transition-opacity">
                <button 
                  onClick={handlePass}
                  className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 text-gray-900"
                >
                  <X size={24} strokeWidth={2.5} />
                </button>
                <span className="text-[11px] font-bold text-[#1a3322]">Pass</span>
              </div>

              {/* Like Button */}
              <div className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-90 transition-opacity">
                <button 
                  onClick={handleLike}
                  className="w-[50px] h-[50px] rounded-full bg-[#1a3322] flex items-center justify-center shadow-[0_4px_12px_rgba(26,51,34,0.2)] border border-[#1a3322] text-white"
                >
                  <Heart size={22} strokeWidth={3} className="fill-white" />
                </button>
                <span className="text-[11px] font-bold text-[#1a3322]">Like</span>
              </div>
            </div>
          )}

          {!isCurrentUser && (
            <button
              onClick={() => setIsReportOpen(true)}
              className="w-full text-center text-red-500 font-semibold text-[13px] py-2 hover:text-red-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <ShieldAlert size={16} />
              Report or Block User
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

      {/* Report Modal */}
      {!isCurrentUser && user && (
        <ReportModal 
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          reportedUserId={user.id}
          reportedUserName={name}
          onSuccess={() => {
            setIsReportOpen(false);
            navigate('/app/discover'); // Go back to discovery or matches
          }}
        />
      )}

      {/* Connection Request Sent Popup Modal */}
      {showRequestSentModal && (
        <div className="fixed inset-0 bg-black/65 backdrop-blur-xs z-50 flex items-center justify-center p-5">
          <div className="bg-[#fdfaf5] border border-amber-200/90 rounded-[28px] p-6 w-full max-w-sm shadow-2xl animate-in fade-in zoom-in duration-200 relative text-center">
            <div className="w-16 h-16 bg-[#1a3322] rounded-full flex items-center justify-center text-amber-300 mx-auto mb-4 shadow-md">
              <Heart size={28} className="fill-amber-300" />
            </div>
            <h2 className="text-[20px] font-bold text-gray-900 mb-2">Connection Request Sent! 🕊️</h2>
            <p className="text-[13.5px] text-gray-600 font-medium leading-relaxed mb-6">
              You have sent a request to <span className="font-bold text-[#1a3322]">{name}</span>. You cannot message them yet until they accept or like you back!
            </p>
            <button
              onClick={() => {
                setShowRequestSentModal(false);
                navigate(-1);
              }}
              className="w-full bg-[#1a3322] text-white font-bold text-[14px] rounded-full py-3.5 shadow-lg hover:bg-[#122418] transition-all"
            >
              Got It, Return to Feed
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
