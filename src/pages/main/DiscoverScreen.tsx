import { useState, useEffect } from 'react';
import { SlidersHorizontal, X, Heart, CheckCircle2, Search, Church, ArrowUpRight, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGetDiscoveryFeedQuery } from '../../store/apiSlice';
import { SwipeService } from '../../services/SwipeService';
import { BottomNavBar } from '../../components/navigation/BottomNavBar';
import { ProfileAttributeRow } from '../../components/ui/ProfileAttributeRow';
import type { User } from '../../types';

export const DiscoverScreen = () => {
  const navigate = useNavigate();
  const [feed, setFeed] = useState<User[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: feedData, isLoading } = useGetDiscoveryFeedQuery(undefined, {
    refetchOnFocus: true, // Automatically fetches new matches when returning to app!
  });

  // Keep a local copy of feed to easily handle swiping removals without waiting for API
  useEffect(() => {
    if (feedData) {
      setFeed(feedData);
      setCurrentIndex(0);
    }
  }, [feedData]);

  const handleSwipe = async (type: 'like' | 'pass') => {
    if (currentIndex >= feed.length) return;
    const targetUserId = feed[currentIndex].id;
    
    try {
      if (type === 'like') {
        const match = await SwipeService.likeUser(targetUserId);
        if (match && match.status === 'active') {
          // If it's a match, go to match success screen!
          navigate('/app/match-success');
          return;
        }
      } else {
        await SwipeService.passUser(targetUserId);
      }
    } catch (error) {
      console.error(`Failed to ${type} user:`, error);
    }
    
    // Move to the next person in the feed
    setCurrentIndex((prev) => prev + 1);
  };

  const currentUser = feed[currentIndex];

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
            {/* Empty div perfectly balances the left icon so the title is dead-center */}
            <div className="w-[26px]" /> 
          </div>
          
          <div className="bg-[#f2e7c4] px-5 py-1.5 rounded-full mt-1">
            <span className="text-[12px] font-bold text-gray-900">
              {feed.length > 0 ? `${feed.length - currentIndex} people nearby` : "0 people nearby"}
            </span>
          </div>
        </div>

        {/* Swipe Card Area */}
        <div className="flex-1 px-4 flex flex-col items-center justify-center w-full">
          
          {isLoading ? (
            <div className="w-full aspect-[3/4] max-h-[68vh] rounded-[32px] bg-[#fdfaf5] flex items-center justify-center animate-pulse">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : !currentUser ? (
            renderEmptyState()
          ) : (
            <div className="w-full aspect-[3/4] max-h-[68vh] rounded-[32px] overflow-hidden shadow-md bg-[#fdfaf5] flex flex-col relative transition-transform duration-300">
              
              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto custom-scrollbar w-full">
                {/* Top Section: Background Photo */}
                <div className="relative w-full aspect-[4/5] shrink-0">
                  {/* Dynamically load the user's first photo, fallback to placeholder */}
                  <img 
                    src={currentUser.photos && currentUser.photos.length > 0 ? currentUser.photos[0] : "/female1.jpg"} 
                    alt={currentUser.first_name || 'User'} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  {/* 93% Match Badge */}
                  <div className="absolute top-5 right-5 bg-[#f7f5f0] px-3 py-1.5 rounded-xl flex flex-col items-center shadow-sm">
                    <span className="text-[12px] font-bold text-[#489954] leading-none mb-0.5">93%</span>
                    <span className="text-[8px] font-semibold text-[#489954] leading-none uppercase">Faith Match</span>
                  </div>

                  {/* User Info Overlay */}
                  <div className="absolute bottom-4 left-0 right-0 px-6 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-[26px] font-bold tracking-tight">
                        {(currentUser.first_name || 'User').split(' ')[0]}
                      </h2>
                      {currentUser.is_verified && <CheckCircle2 size={20} className="text-white fill-[#489954]" />}
                    </div>
                    
                    <p className="text-[15px] font-bold shadow-sm">
                      {currentUser.denomination || 'Christian'}
                    </p>
                  </div>
                </div>

                {/* Detailed Info Section */}
                <div className="w-full bg-[#fdfaf5] px-6 pt-5 pb-6 flex flex-col">
                  {/* About Me */}
                  <div className="w-full flex flex-col mb-6">
                    <h2 className="text-[15px] font-bold text-gray-900 mb-2">About me</h2>
                    <p className="text-[13px] text-gray-500 font-medium leading-relaxed whitespace-pre-line">
                      {'"I can do all things through Christ who strengthens me."\nLooking for a godly partner to build a Christ-centered life together.'}
                    </p>
                  </div>

                  {/* Faith Attributes List */}
                  <div className="w-full flex flex-col">
                    <ProfileAttributeRow 
                      icon={<Church size={18} strokeWidth={2} />} 
                      title="Church" 
                      value={currentUser.denomination || 'Not specified'} 
                    />
                    <ProfileAttributeRow 
                      icon={<ArrowUpRight size={18} strokeWidth={2} />} 
                      title="Faith" 
                      value={currentUser.prayer_freq || 'Growing'} 
                    />
                    <ProfileAttributeRow 
                      icon={<BookOpen size={18} strokeWidth={2} />} 
                      title="Bible Study" 
                      value={currentUser.bible_freq || 'Daily'} 
                    />
                    <ProfileAttributeRow 
                      icon={<Heart size={18} strokeWidth={2.5} className="fill-[#1a3322]" />} 
                      title="Relationship Goal" 
                      value={currentUser.intentions || (currentUser as any).interested_in || 'Marriage'} 
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Section: Action Area (Fixed at bottom of card) */}
              <div className="w-full bg-[#fdfaf5] pb-5 pt-3 shrink-0 flex justify-center gap-6 px-6 border-t border-gray-100/50 shadow-[0_-4px_10px_-4px_rgba(0,0,0,0.05)] z-10">
                
                {/* Pray Button */}
                <div className="flex flex-col items-center gap-1.5 cursor-pointer hover:opacity-90 transition-opacity">
                  <button className="w-[54px] h-[54px] rounded-full bg-white flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-gray-100">
                    <span className="text-[24px]">🙏</span>
                  </button>
                  <span className="text-[12px] font-bold text-[#1a3322]">Pray</span>
                </div>

                {/* Pass Button */}
                <div className="flex flex-col items-center gap-1.5 cursor-pointer hover:opacity-90 transition-opacity">
                  <button 
                    onClick={() => handleSwipe('pass')}
                    className="w-[54px] h-[54px] rounded-full bg-white flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 text-gray-900">
                    <X size={28} strokeWidth={2.5} />
                  </button>
                  <span className="text-[12px] font-bold text-[#1a3322]">Pass</span>
                </div>

                {/* Like Button */}
                <div className="flex flex-col items-center gap-1.5 cursor-pointer hover:opacity-90 transition-opacity">
                  <button 
                    onClick={() => handleSwipe('like')}
                    className="w-[54px] h-[54px] rounded-full bg-[#1a3322] flex items-center justify-center shadow-[0_4px_12px_rgba(26,51,34,0.2)] border border-[#1a3322] text-white">
                    <Heart size={24} strokeWidth={3} className="fill-white" />
                  </button>
                  <span className="text-[12px] font-bold text-[#1a3322]">Like</span>
                </div>

              </div>

            </div>
          )}
        </div>

        {/* Bottom Nav Bar Integration! */}
        <BottomNavBar />
      </div>
    </div>
  );
};
