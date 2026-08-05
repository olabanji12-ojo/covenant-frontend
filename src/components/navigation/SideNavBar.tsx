import { useNavigate, useLocation } from 'react-router-dom';
import { Compass, Heart, MessageCircle, Bell, User, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

export type NavTab = 'discover' | 'matches' | 'messages' | 'prayers' | 'profile';

export const SideNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

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
    if (tabId === 'messages') navigate('/app/chat');
    if (tabId === 'prayers') navigate('/app/prayers');
    if (tabId === 'profile') navigate('/app/profile');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const getTabClass = (tab: NavTab) => {
    const isActive = activeTab === tab;
    return `flex items-center gap-4 px-6 py-4 rounded-2xl cursor-pointer transition-all ${
      isActive ? 'bg-[#1a3322] text-white font-bold shadow-md' : 'text-gray-600 hover:bg-[#e8e4db] font-medium'
    }`;
  };

  const getIconClass = (tab: NavTab) => {
    const isActive = activeTab === tab;
    return isActive ? 'text-white fill-white' : 'text-gray-500 fill-transparent';
  };

  // Only render on medium screens and up
  return (
    <div className="hidden md:flex flex-col w-72 bg-[#f7f5f0] border-r border-gray-200 h-screen py-8 px-6 sticky top-0 shrink-0">
      
      {/* Brand / Logo */}
      <div className="mb-12 px-4">
        <h1 className="text-2xl font-bold text-[#1a3322]">Church Match</h1>
        <p className="text-sm text-gray-500 mt-1">Find your faith partner</p>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col gap-2 flex-1">
        <button onClick={() => handleTabClick('discover')} className={getTabClass('discover')}>
          <Compass size={24} strokeWidth={activeTab === 'discover' ? 2 : 1.5} className={getIconClass('discover')} />
          <span className="text-[17px]">Discover</span>
        </button>

        <button onClick={() => handleTabClick('matches')} className={getTabClass('matches')}>
          <Heart size={24} strokeWidth={activeTab === 'matches' ? 2 : 1.5} className={getIconClass('matches')} />
          <span className="text-[17px]">Matches</span>
        </button>

        <button onClick={() => handleTabClick('messages')} className={getTabClass('messages')}>
          <MessageCircle size={24} strokeWidth={activeTab === 'messages' ? 2 : 1.5} className={getIconClass('messages')} />
          <span className="text-[17px]">Messages</span>
        </button>

        <button onClick={() => handleTabClick('prayers')} className={getTabClass('prayers')}>
          <Bell size={24} strokeWidth={activeTab === 'prayers' ? 2 : 1.5} className={getIconClass('prayers')} />
          <span className="text-[17px]">Prayers</span>
        </button>

        <button onClick={() => handleTabClick('profile')} className={getTabClass('profile')}>
          <User size={24} strokeWidth={activeTab === 'profile' ? 2 : 1.5} className={getIconClass('profile')} />
          <span className="text-[17px]">Profile</span>
        </button>
      </div>

      {/* Logout / Bottom Actions */}
      <div className="mt-auto">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-4 px-6 py-4 rounded-2xl w-full text-left text-red-600 hover:bg-red-50 font-medium transition-colors"
        >
          <LogOut size={24} strokeWidth={2} />
          <span className="text-[17px]">Log Out</span>
        </button>
      </div>

    </div>
  );
};
