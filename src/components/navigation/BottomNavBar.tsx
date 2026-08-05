import { useNavigate, useLocation } from 'react-router-dom';
import { Compass, Heart, MessageCircle, Bell, User } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { clearUnread } from '../../store/chatSlice';

export type NavTab = 'discover' | 'matches' | 'messages' | 'prayers' | 'profile';

// We no longer need to pass props because the NavBar reads the route URL directly!
export const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const unreadCount = useSelector((state: RootState) => state.chat.unreadCount);

  // Dynamically determine the active tab based on the current URL
  const activeTab = (() => {
    const path = location.pathname;
    if (path.includes('matches')) return 'matches';
    if (path.includes('chat')) return 'messages';
    if (path.includes('prayers')) return 'prayers';
    if (path.includes('profile')) return 'profile';
    return 'discover';
  })();

  const handleTabClick = (tabId: NavTab) => {
    if (tabId === 'discover') navigate('/app/discover');
    if (tabId === 'matches') navigate('/app/matches');
    if (tabId === 'messages') {
      dispatch(clearUnread());
      navigate('/app/chat');
    }
    if (tabId === 'prayers') navigate('/app/prayers');
    if (tabId === 'profile') navigate('/app/profile');
  };

  return (
    // We use fixed positioning to stick it to the bottom of the screen
    // left-1/2 and -translate-x-1/2 ensure it centers on desktop screens, while max-w-sm keeps it constrained
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-[#f7f5f0] px-6 py-3 pb-8 flex justify-between items-center z-50 md:hidden">

      {/* Discover Tab (Special styling with a background circle) */}
      <button onClick={() => handleTabClick('discover')} className="flex flex-col items-center gap-1">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${activeTab === 'discover' ? 'bg-primary' : 'bg-gray-500'}`}>
          <Compass className="text-white" size={26} strokeWidth={1.5} />
        </div>
        <span className={`text-[13px] font-medium ${activeTab === 'discover' ? 'text-primary' : 'text-gray-500'}`}>Discover</span>
      </button>

      {/* Matches Tab */}
      <button onClick={() => handleTabClick('matches')} className="flex flex-col items-center gap-1">
        <div className="w-12 h-12 flex items-center justify-center">
          <Heart
            size={30}
            strokeWidth={1.5}
            className={`transition-colors ${activeTab === 'matches' ? 'fill-primary text-primary' : 'text-gray-500 fill-transparent'}`}
          />
        </div>
        <span className={`text-[13px] font-medium ${activeTab === 'matches' ? 'text-primary' : 'text-gray-500'}`}>Matches</span>
      </button>

      {/* Messages Tab */}
      <button onClick={() => handleTabClick('messages')} className="flex flex-col items-center gap-1">
        <div className="w-12 h-12 flex items-center justify-center relative">
          <MessageCircle
            size={30}
            strokeWidth={1.5}
            className={`transition-colors ${activeTab === 'messages' ? 'fill-primary text-primary' : 'text-gray-500 fill-transparent'}`}
          />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </div>
        <span className={`text-[13px] font-medium ${activeTab === 'messages' ? 'text-primary' : 'text-gray-500'}`}>Messages</span>
      </button>

      {/* Prayers Tab */}
      <button onClick={() => handleTabClick('prayers')} className="flex flex-col items-center gap-1">
        <div className="w-12 h-12 flex items-center justify-center">
          <Bell
            size={30}
            strokeWidth={1.5}
            className={`transition-colors ${activeTab === 'prayers' ? 'fill-primary text-primary' : 'text-gray-500 fill-transparent'}`}
          />
        </div>
        <span className={`text-[13px] font-medium ${activeTab === 'prayers' ? 'text-primary' : 'text-gray-500'}`}>Prayers</span>
      </button>

      {/* Profile Tab */}
      <button onClick={() => handleTabClick('profile')} className="flex flex-col items-center gap-1">
        <div className="w-12 h-12 flex items-center justify-center">
          <User
            size={30}
            strokeWidth={1.5}
            className={`transition-colors ${activeTab === 'profile' ? 'fill-primary text-primary' : 'text-gray-500 fill-transparent'}`}
          />
        </div>
        <span className={`text-[13px] font-medium ${activeTab === 'profile' ? 'text-primary' : 'text-gray-500'}`}>Profile</span>
      </button>

    </div>
  );
};
