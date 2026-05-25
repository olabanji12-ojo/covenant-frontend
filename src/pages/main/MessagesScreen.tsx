import { useNavigate } from 'react-router-dom';
import { BottomNavBar } from '../../components/navigation/BottomNavBar';
import { MessageCircle, Search } from 'lucide-react';
import { useGetMatchesQuery } from '../../store/apiSlice';

export const MessagesScreen = () => {
  const navigate = useNavigate();
  const { data: matchesData, isLoading } = useGetMatchesQuery(undefined, {
    pollingInterval: 10000, // Auto-poll every 10 seconds to catch new matches silently
    refetchOnFocus: true,
  });
  const matches = matchesData || [];

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f5f0] w-full max-w-sm mx-auto relative overflow-hidden pb-28">
      
      {/* Header */}
      <div className="px-6 pt-10 pb-4 w-full shrink-0">
        <h1 className="text-[22px] font-bold text-[#1a3322] mb-4">Messages</h1>
        
        {/* Search Bar */}
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} strokeWidth={2} />
          <input 
            type="text" 
            placeholder="Search messages..." 
            className="w-full bg-white border border-gray-200 rounded-full py-3 pl-11 pr-4 text-[13px] text-gray-900 focus:outline-none focus:border-[#489954] shadow-sm font-medium placeholder-gray-400"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 custom-scrollbar">
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-6 h-6 border-2 border-[#489954] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : matches.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <div className="w-16 h-16 bg-[#e5ede7] rounded-full flex items-center justify-center mb-4">
              <MessageCircle size={32} className="text-[#1a3322]" strokeWidth={1.5} />
            </div>
            <h2 className="text-[18px] font-bold text-gray-900 mb-2">No messages yet</h2>
            <p className="text-[14px] text-gray-500 leading-relaxed px-4">
              When you match with someone, you can start a conversation here.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 mt-2">
            {matches.map((matchResp, idx) => {
              const user = matchResp.user;
              const lastMessage = matchResp.last_message;
              const displayName = (user.first_name || 'Match').split(' ')[0];
              const avatar = user.photos?.[0] || '/female1.jpg';
              
              // Format time if lastMessage exists
              let timeString = 'New match';
              if (lastMessage && lastMessage.created_at) {
                timeString = new Date(lastMessage.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              }

              return (
                <div 
                  key={user.id || idx}
                  onClick={() => navigate(`/app/chat/${user.id}`, { state: { matchUser: user } })}
                  className="flex items-center gap-4 bg-white p-3.5 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all group"
                >
                  <div className="w-[50px] h-[50px] rounded-full overflow-hidden shrink-0 border border-gray-100">
                    <img src={avatar} alt={displayName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-[15px] text-gray-900">{displayName}</h3>
                      <span className="text-[10px] text-gray-400 font-medium">{timeString}</span>
                    </div>
                    <p className={`text-[13px] truncate w-[200px] ${lastMessage ? 'text-gray-600' : 'text-gray-400 italic'}`}>
                      {lastMessage ? lastMessage.content : 'Tap to start chatting!'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Nav Bar */}
      <BottomNavBar />
      
    </div>
  );
};
