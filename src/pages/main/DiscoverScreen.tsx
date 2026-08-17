import { useState, useEffect } from 'react';
import { SlidersHorizontal, X, Heart, CheckCircle2, Search, Church, ArrowUpRight, BookOpen, Sparkles, Loader2, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetDiscoveryFeedQuery } from '../../store/apiSlice';
import { SwipeService } from '../../services/SwipeService';
import { BottomNavBar } from '../../components/navigation/BottomNavBar';
import { ProfileAttributeRow } from '../../components/ui/ProfileAttributeRow';
import { updateUserProfile, fetchCurrentUser } from '../../store/authSlice';
import type { RootState, AppDispatch } from '../../store';
import type { User } from '../../types';

export const DiscoverScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const [feed, setFeed] = useState<User[]>([]);
  const { data: feedData, isLoading, refetch } = useGetDiscoveryFeedQuery(undefined, {
    refetchOnFocus: true, // Automatically fetches new matches when returning to app!
  });

  // Modal State for "Describe Your Ideal Partner"
  const [showIdealPartnerModal, setShowIdealPartnerModal] = useState<boolean>(false);
  const [partnerPrefText, setPartnerPrefText] = useState<string>('');
  const [isSavingPref, setIsSavingPref] = useState<boolean>(false);

  // Auto-open modal if user hasn't specified partner preferences yet!
  // (Skip for guests — they can't save preferences until they register)
  useEffect(() => {
    if (user && !user.is_guest) {
      setPartnerPrefText(user.partner_pref_text || '');
      if (!user.partner_pref_text) {
        setShowIdealPartnerModal(true);
      }
    }
  }, [user]);

  // Keep a local copy of feed to easily handle swiping removals without waiting for API
  useEffect(() => {
    if (feedData) {
      setFeed(feedData);
    }
  }, [feedData]);

  const handleSaveIdealPartner = async () => {
    if (!partnerPrefText.trim()) return;
    setIsSavingPref(true);
    try {
      await dispatch(updateUserProfile({ partner_pref_text: partnerPrefText })).unwrap();
      await dispatch(fetchCurrentUser());
      refetch();
      setShowIdealPartnerModal(false);
    } catch (err) {
      console.error("Failed to save partner preference:", err);
    } finally {
      setIsSavingPref(false);
    }
  };

  const handleSwipe = async (candidate: User, type: 'like' | 'pass') => {
    try {
      if (type === 'like') {
        const match = await SwipeService.likeUser(candidate.id);
        if (match && match.status === 'matched') {
          // If it's a match, go to match success screen!
          navigate('/app/match-success', { state: { matchUser: candidate } });
          return;
        }
      } else {
        await SwipeService.passUser(candidate.id);
      }
    } catch (error) {
      console.error(`Failed to ${type} user:`, error);
    }
    
    // Remove the swiped user locally so the card disappears from the horizontal feed
    setFeed((prev) => prev.filter((user) => user.id !== candidate.id));
  };

  // ==========================================
  // EMPTY STATE UI
  // ==========================================
  const renderEmptyState = () => (
    <div className="w-full aspect-[3/4] max-h-[68vh] rounded-[32px] overflow-hidden shadow-md bg-[#fdfaf5] border border-gray-100 flex flex-col items-center justify-center p-8 text-center">
      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <Search size={40} className="text-primary" strokeWidth={1.5} />
      </div>
      <h2 className="text-[22px] font-bold text-gray-900 mb-3">
        No Matches Yet
      </h2>
      <p className="text-[15px] text-gray-500 mb-8 leading-relaxed">
        We've shown you everyone in your area right now. Expand your filters or update your faith profile to see more people!
      </p>
      <button 
        onClick={() => navigate('/app/filters')}
        className="px-8 py-3.5 bg-[#1a3322] text-white rounded-[14px] font-bold text-[15px] hover:bg-[#122418] transition-colors shadow-sm"
      >
        Update Filters
      </button>
    </div>
  );

  return (
    // We increase padding to pb-36 to create a solid gap above the bottom nav bar!
    <div className="min-h-screen bg-[#f7f5f0] flex flex-col items-center pb-36">
      <div className="w-full max-w-sm flex flex-col flex-1 relative">
        
        {/* Header Section */}
        <div className="flex flex-col items-center pt-8 px-6 pb-4">
          <div className="w-full flex justify-between items-center mb-4">
            <button 
              onClick={() => navigate('/app/filters')}
              className="text-gray-900 hover:opacity-70 transition-opacity">
              <SlidersHorizontal size={26} strokeWidth={1.5} />
            </button>
            <h1 className="text-[24px] font-bold text-gray-900">Discover</h1>
            <button 
              onClick={() => setShowIdealPartnerModal(true)}
              title="Describe Ideal Partner"
              className="bg-amber-100/90 hover:bg-amber-200 text-amber-900 rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-xs border border-amber-300/60 transition-colors">
              <Sparkles size={15} className="text-amber-700 fill-amber-300" />
              <span className="text-[11px] font-bold">Ideal Partner</span>
            </button> 
          </div>
          
          <div className="bg-[#f2e7c4] px-5 py-1.5 rounded-full mt-1">
            <span className="text-[12px] font-bold text-gray-900">
              {feed.length > 0 ? `${feed.length} people nearby` : "0 people nearby"}
            </span>
          </div>
        </div>

        {/* ── GUEST SIGN-UP BANNER ── */}
        {user?.is_guest && (
          <div className="mx-4 mb-2 bg-[#1a3322] rounded-2xl px-4 py-3 flex items-center justify-between gap-3 shadow-md">
            <div className="flex flex-col">
              <span className="text-white font-bold text-[13px] leading-snug">You're browsing as a Guest</span>
              <span className="text-white/60 text-[11px] font-medium mt-0.5">Sign up to like, match & chat</span>
            </div>
            <button
              onClick={() => navigate('/signup')}
              className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 transition-colors text-[#1a3322] font-bold text-[12px] px-3 py-2 rounded-xl shrink-0"
            >
              <UserPlus size={14} strokeWidth={2.5} />
              Sign Up Free
            </button>
          </div>
        )}

        {/* Swipe Card Area */}
        <div className="flex-1 flex flex-col items-center justify-center w-full min-h-[60vh]">
          
          {isLoading ? (
            <div className="w-full px-4 aspect-[3/4] max-h-[68vh] rounded-[32px] bg-[#fdfaf5] flex items-center justify-center animate-pulse">
              <div className="w-12 h-12 border-4 border-[#1a3322] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : feed.length === 0 ? (
            <div className="px-4 w-full">
              {renderEmptyState()}
            </div>
          ) : (
            <div className="w-full flex items-center overflow-x-auto snap-x snap-mandatory gap-4 px-6 py-4 scrollbar-none scroll-smooth">
              {feed.map((candidate) => (
                <div 
                  key={candidate.id}
                  className="w-[82vw] max-w-[310px] shrink-0 snap-center aspect-[3/4] max-h-[68vh] rounded-[32px] overflow-hidden shadow-md bg-[#fdfaf5] flex flex-col relative border border-gray-100/60"
                >
                  
                  {/* Tap container to view details */}
                  <div 
                    onClick={() => navigate('/app/profile-detail', { state: { user: candidate } })}
                    className="flex-1 overflow-y-auto custom-scrollbar w-full flex flex-col cursor-pointer"
                  >
                    {/* Top Section: Background Photo */}
                    <div className="relative w-full aspect-[4/5] shrink-0">
                      <img 
                        src={candidate.photos && candidate.photos.length > 0 ? candidate.photos[0] : "/female1.jpg"} 
                        alt={candidate.first_name || 'User'} 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      
                      {/* Gradient Overlay for Text Readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                      {/* Dynamic Covenant Match Badge */}
                      <div className="absolute top-5 right-5 bg-[#1a3322] text-white px-3 py-1.5 rounded-xl flex flex-col items-center shadow-lg border border-amber-400/30">
                        <span className="text-[13px] font-extrabold text-amber-300 leading-none mb-0.5">
                          {candidate.match_score ? `${candidate.match_score}%` : (() => {
                            if (!candidate.id) return "88%";
                            let hash = 0;
                            for (let i = 0; i < candidate.id.length; i++) {
                              hash = candidate.id.charCodeAt(i) + ((hash << 5) - hash);
                            }
                            return `${85 + (Math.abs(hash) % 14)}%`;
                          })()}
                        </span>
                        <span className="text-[8px] font-bold text-amber-200/90 leading-none uppercase tracking-wider">Covenant Match</span>
                      </div>

                      {/* Shared Heart Badges Overlay */}
                      {candidate.shared_badges && candidate.shared_badges.length > 0 && (
                        <div className="absolute top-5 left-5 flex flex-col gap-1 max-w-[65%]">
                          {candidate.shared_badges.slice(0, 2).map((badge, idx) => (
                            <span key={idx} className="bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2.5 py-1 rounded-full border border-white/20 truncate">
                              {badge}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* User Info Overlay */}
                      <div className="absolute bottom-4 left-0 right-0 px-6 text-white">
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-[24px] font-bold tracking-tight">
                            {(candidate.first_name || 'User').split(' ')[0]}
                          </h2>
                          {candidate.is_verified && <CheckCircle2 size={18} className="text-white fill-[#489954]" />}
                        </div>
                        
                        <p className="text-[14px] font-bold shadow-sm opacity-90">
                          {candidate.denomination || 'Christian'}
                        </p>
                      </div>
                    </div>

                    {/* Detailed Info Section */}
                    <div className="w-full bg-[#fdfaf5] px-6 pt-5 pb-6 flex flex-col">
                      {/* Covenant Insight Icebreaker Teaser */}
                      {candidate.icebreaker_prompt && (
                        <div className="w-full bg-amber-50/80 border border-amber-200/80 rounded-xl p-3 mb-4">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                            ✨ Covenant Shared Insight
                          </span>
                          <p className="text-[12px] font-medium text-amber-950 mt-1.5 leading-snug">
                            {candidate.icebreaker_prompt}
                          </p>
                        </div>
                      )}

                      {/* About Me */}
                      <div className="w-full flex flex-col mb-5">
                        <h2 className="text-[14px] font-bold text-gray-900 mb-1.5">About me</h2>
                        <p className="text-[12.5px] text-gray-500 font-medium leading-relaxed whitespace-pre-line">
                          {candidate.bio || 'No bio added yet.'}
                        </p>
                      </div>

                      {/* Faith Attributes List */}
                      <div className="w-full flex flex-col">
                        <ProfileAttributeRow 
                          icon={<Church size={17} strokeWidth={2} />} 
                          title="Church" 
                          value={candidate.denomination || 'Not specified'} 
                        />
                        <ProfileAttributeRow 
                          icon={<ArrowUpRight size={17} strokeWidth={2} />} 
                          title="Faith" 
                          value={candidate.prayer_freq || 'Growing'} 
                        />
                        <ProfileAttributeRow 
                          icon={<BookOpen size={17} strokeWidth={2} />} 
                          title="Bible Study" 
                          value={candidate.bible_freq || 'Daily'} 
                        />
                        <ProfileAttributeRow 
                          icon={<Heart size={17} strokeWidth={2.5} className="fill-[#1a3322]" />} 
                          title="Relationship Goal" 
                          value={candidate.intention || (candidate as any).interested_in || 'Marriage'} 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Area inside each card */}
                  <div className="w-full bg-[#fdfaf5] pb-5 pt-3 shrink-0 flex justify-center gap-6 px-6 border-t border-gray-100/50 shadow-[0_-4px_10px_-4px_rgba(0,0,0,0.05)] z-10">
                    
                    {/* Pass Button */}
                    <div className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-90 transition-opacity">
                      <button 
                        onClick={() => handleSwipe(candidate, 'pass')}
                        className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 text-gray-900"
                      >
                        <X size={24} strokeWidth={2.5} />
                      </button>
                      <span className="text-[11px] font-bold text-[#1a3322]">Pass</span>
                    </div>

                    {/* Like Button */}
                    <div className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-90 transition-opacity">
                      <button 
                        onClick={() => handleSwipe(candidate, 'like')}
                        className="w-[50px] h-[50px] rounded-full bg-[#1a3322] flex items-center justify-center shadow-[0_4px_12px_rgba(26,51,34,0.2)] border border-[#1a3322] text-white"
                      >
                        <Heart size={22} strokeWidth={3} className="fill-white" />
                      </button>
                      <span className="text-[11px] font-bold text-[#1a3322]">Like</span>
                    </div>

                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Nav Bar Integration! */}
        <BottomNavBar />

        {/* Describe Your Ideal Partner Modal Popup */}
        {showIdealPartnerModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-[#fdfaf5] border border-amber-200/90 rounded-[28px] p-6 w-full max-w-sm shadow-2xl animate-in fade-in zoom-in duration-200 relative">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#1a3322] flex items-center justify-center text-amber-300">
                    <Sparkles size={16} />
                  </div>
                  <h2 className="text-[17px] font-bold text-gray-900">Describe Your Ideal Partner</h2>
                </div>
                <button 
                  onClick={() => setShowIdealPartnerModal(false)}
                  className="text-gray-400 hover:text-gray-700 p-1">
                  <X size={18} />
                </button>
              </div>

              <p className="text-[12.5px] text-gray-600 font-medium mb-4 leading-snug">
                Tell our AI engine about the spiritual maturity, character traits, and values you seek in a partner to calculate your Covenant Matches.
              </p>

              <textarea
                rows={4}
                value={partnerPrefText}
                onChange={(e) => setPartnerPrefText(e.target.value)}
                placeholder="e.g. Seeking a prayerful, ministry-focused partner who values family, open communication, and kingdom stewardship..."
                className="w-full bg-white border border-gray-200 rounded-[14px] p-3 text-[13px] font-medium text-gray-900 focus:outline-none focus:border-[#1a3322] resize-none mb-4 shadow-inner"
              />

              <button
                onClick={handleSaveIdealPartner}
                disabled={isSavingPref || !partnerPrefText.trim()}
                className="w-full bg-[#1a3322] text-white font-bold text-[14px] rounded-full py-3.5 shadow-lg hover:bg-[#122418] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSavingPref ? (
                  <Loader2 size={18} className="animate-spin text-white" />
                ) : (
                  <>
                    <Sparkles size={15} className="text-amber-300" />
                    <span>Save & Calculate My Matches</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
