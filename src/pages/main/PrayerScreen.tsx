import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { BottomNavBar } from '../../components/navigation/BottomNavBar';
import { useGetPrayersQuery, usePostPrayerMutation, usePostAmenMutation } from '../../store/apiSlice';
import { HeartHandshake, Send, Heart } from 'lucide-react';

export const PrayerScreen = () => {
  const [activeFilter, setActiveFilter] = useState<'Pray' | 'Prayed for me' | 'Answered'>('Pray');
  const [newPrayerContent, setNewPrayerContent] = useState('');
  const currentUser = useSelector((state: RootState) => state.auth.user);
  
  const { data: prayersData, isLoading: loading } = useGetPrayersQuery(undefined, { refetchOnFocus: true });
  const prayers = prayersData || [];
  
  const [postPrayerMutation, { isLoading: isPosting }] = usePostPrayerMutation();
  const [postAmenMutation] = usePostAmenMutation();

  const handlePostPrayer = async () => {
    if (!newPrayerContent.trim()) return;
    try {
      await postPrayerMutation({ content: newPrayerContent }).unwrap();
      setNewPrayerContent('');
    } catch (err) {
      console.error("Failed to post prayer:", err);
    }
  };

  const handleAmen = async (prayerId: string) => {
    try {
      await postAmenMutation(prayerId).unwrap();
    } catch (err) {
      console.error("Failed to add Amen:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f5f0] w-full max-w-sm mx-auto relative overflow-hidden pb-28">
      
      {/* Header Section */}
      <div className="flex flex-col items-center pt-8 px-6 pb-2 w-full shrink-0">
        <h1 className="text-[22px] font-bold text-gray-900 mb-5">Prayer Wall</h1>
        
        {/* Segmented Control */}
        <div className="w-full bg-white rounded-full p-1 flex items-center justify-between shadow-sm border border-gray-100">
          {(['Pray', 'Prayed for me', 'Answered'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`flex-1 text-[12px] font-bold rounded-full py-2.5 transition-colors ${
                activeFilter === tab 
                  ? 'bg-[#1a3322] text-white' 
                  : 'bg-transparent text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area (Scrollable) */}
      <div className="flex-1 px-4 pt-4 overflow-y-auto w-full custom-scrollbar flex flex-col items-center">
        
        {/* Compose Prayer Box */}
        <div className="w-full bg-white rounded-2xl p-4 shadow-sm mb-6 border border-gray-100 flex flex-col gap-3">
          <textarea 
            placeholder="Share a prayer request with the community..."
            value={newPrayerContent}
            onChange={(e) => setNewPrayerContent(e.target.value)}
            className="w-full bg-transparent text-[13px] text-gray-900 outline-none resize-none h-[60px] placeholder:text-gray-400"
          />
          <div className="flex justify-end">
            <button 
              onClick={handlePostPrayer}
              disabled={isPosting || !newPrayerContent.trim()}
              className="bg-[#1a3322] text-white text-[12px] font-bold px-5 py-2 rounded-full flex items-center gap-1.5 hover:bg-[#122418] transition-colors disabled:opacity-50"
            >
              <Send size={14} />
              Post
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-32">
            <div className="w-8 h-8 border-4 border-[#1a3322] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-center text-sm font-medium text-[#1a3322]">Loading prayers...</p>
          </div>
        ) : prayers.length > 0 ? (
          <div className="w-full flex flex-col gap-4 pb-10">
            {prayers.map((prayer) => {
              const hasAmened = Boolean(currentUser && prayer.amens_by?.includes(currentUser.id));
              return (
                <div key={prayer.id} className="w-full bg-[#fdfaf0] rounded-2xl p-5 flex flex-col gap-4 shadow-sm border border-[#f3ead1]">
                  <div className="flex items-start gap-3">
                    <img 
                      src={prayer.author_photo || '/male1.png'} 
                      alt={prayer.author_name} 
                      className="w-10 h-10 rounded-full object-cover shrink-0 shadow-sm bg-white"
                    />
                    <div className="flex flex-col pt-0.5">
                      <h3 className="text-[14px] font-bold text-gray-900 leading-none mb-1">{prayer.author_name}</h3>
                      <p className="text-[11px] text-gray-500 font-medium">
                        {new Date(prayer.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-[14px] text-gray-800 font-medium leading-relaxed px-1">
                    "{prayer.content}"
                  </p>
                  
                  <div className="flex items-center justify-between mt-2 pt-4 border-t border-[#ebdcb3]/40 px-1">
                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={() => handleAmen(prayer.id)}
                        disabled={hasAmened}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors ${
                          hasAmened ? 'bg-[#e2f0e5] text-[#1a3322]' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <Heart size={14} className={hasAmened ? 'fill-[#1a3322]' : ''} />
                        <span className="text-[12px] font-bold">{hasAmened ? 'Amen!' : 'Amen'}</span>
                      </button>
                      <span className="text-[12px] font-bold text-gray-500 ml-1">
                        {prayer.amen_count || 0}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center mt-6 px-4 w-full">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 border border-gray-100">
              <HeartHandshake size={36} className="text-[#1a3322]" strokeWidth={1.5} />
            </div>
            <h2 className="text-[18px] font-bold text-gray-900 mb-2">No Prayer Requests</h2>
            <p className="text-[14px] text-gray-500 leading-relaxed mb-8">
              Be the first to share a prayer request with the community!
            </p>
          </div>
        )}

      </div>

      {/* Bottom Nav Bar */}
      <BottomNavBar />
      
    </div>
  );
};
