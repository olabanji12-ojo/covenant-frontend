import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavBar } from '../../components/navigation/BottomNavBar';
import apiClient from '../../api/client';
import type { User, ApiResponse, MatchResponse } from '../../types';
import { HeartCrack, Heart, Sparkles, Loader2 } from 'lucide-react';
import { SwipeService } from '../../services/SwipeService';

interface MatchRowProps {
  name: string;
  age: number;
  profession: string;
  location: string;
  imageUrl: string;
  isNewMatch?: boolean;
}

const MatchRow = ({
  matchUser,
  name,
  age,
  profession,
  location,
  imageUrl,
  isNewMatch = true,
}: MatchRowProps & { matchUser: User }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate('/app/profile-detail', { state: { user: matchUser, isMatch: true } })}
      className="flex items-center gap-4 py-3 border-b border-gray-200 last:border-0 w-full cursor-pointer hover:opacity-80 transition-opacity active:scale-[0.99]">
      {/* Avatar Container */}
      <div className="w-[52px] h-[52px] flex-shrink-0">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full rounded-full object-cover shadow-sm bg-gray-200"
        />
      </div>
      
      {/* Text Details Area */}
      <div className="flex flex-col flex-1 pb-1">
        <h3 className="text-[15px] font-bold text-gray-900 leading-tight mb-0.5">
          {name}, {age}
        </h3>
        <p className="text-[12px] text-gray-500 font-medium leading-tight mb-1.5">
          {profession}. {location}.
        </p>
        
        {/* New Match Badge */}
        {isNewMatch && (
          <div className="self-start bg-[#f2e7c4] px-1.5 py-0.5 rounded-[3px] flex items-center justify-center">
            <span className="text-[8px] font-bold text-[#489954] uppercase leading-none mt-[1px]">
              New match
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

interface RequestRowProps {
  user: User;
  age: number;
  onConnectBack: (user: User) => void;
  connectingId: string | null;
}

const RequestRow = ({ user, age, onConnectBack, connectingId }: RequestRowProps) => {
  const navigate = useNavigate();
  const name = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Anonymous';
  const imageUrl = user.photos && user.photos.length > 0 ? user.photos[0] : '/male1.png';
  const church = user.custom_church || user.denomination || 'Christian Faith';
  const isConnecting = connectingId === user.id;

  return (
    <div className="flex items-center justify-between gap-3 py-3 border-b border-gray-100 last:border-0 w-full bg-white p-3 rounded-2xl mb-2 shadow-xs border border-amber-100/60">
      <div 
        onClick={() => navigate('/app/profile-detail', { state: { user } })}
        className="flex items-center gap-3 flex-1 cursor-pointer min-w-0"
      >
        <div className="w-[52px] h-[52px] flex-shrink-0 relative">
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full rounded-full object-cover shadow-sm bg-gray-200 border-2 border-emerald-500"
          />
          <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white rounded-full p-0.5 shadow-xs">
            <Sparkles size={10} />
          </div>
        </div>
        <div className="flex flex-col min-w-0">
          <h3 className="text-[15px] font-bold text-gray-900 leading-tight truncate">
            {name}, {age}
          </h3>
          <p className="text-[12px] text-[#1a3322] font-medium leading-tight truncate mt-0.5">
            {church}
          </p>
          <span className="text-[10px] text-amber-700 font-semibold bg-amber-50 rounded-full px-2 py-0.5 mt-1 inline-block w-fit">
            Sent you a request
          </span>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onConnectBack(user);
        }}
        disabled={isConnecting}
        className="bg-[#1a3322] hover:bg-[#122418] text-white text-[12px] font-bold px-3.5 py-2.5 rounded-full flex items-center gap-1.5 transition-all shadow-sm shrink-0 active:scale-95 disabled:opacity-50"
      >
        {isConnecting ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <>
            <Heart size={13} className="fill-white" />
            <span>Connect Back</span>
          </>
        )}
      </button>
    </div>
  );
};

export const MatchesScreen = () => {
  const [activeFilter, setActiveFilter] = useState<'Matches' | 'Requests' | 'All'>('Matches');
  const [matchesData, setMatchesData] = useState<MatchResponse[]>([]);
  const [requestsData, setRequestsData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [now] = useState(() => Date.now());
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const [matchesRes, requestsRes] = await Promise.all([
        apiClient.get<ApiResponse<MatchResponse[]>>('/matches'),
        SwipeService.getPendingRequests().catch(() => [] as User[])
      ]);

      if (matchesRes.data.data) {
        setMatchesData(matchesRes.data.data);
      }
      if (Array.isArray(requestsRes)) {
        setRequestsData(requestsRes);
      }
    } catch (err) {
      console.error("Failed to load matches data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const calculateAge = (dobString?: string) => {
    if (!dobString) return 29;
    const dob = new Date(dobString);
    const diff_ms = now - dob.getTime();
    const age_dt = new Date(diff_ms); 
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  };

  const handleConnectBack = async (targetUser: User) => {
    try {
      setConnectingId(targetUser.id);
      const match = await SwipeService.likeUser(targetUser.id);
      if (match && match.status === 'matched') {
        navigate('/app/match-success', { state: { matchUser: targetUser } });
      } else {
        await fetchData();
      }
    } catch (err) {
      console.error("Failed to connect back:", err);
    } finally {
      setConnectingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0] flex flex-col items-center w-full">
      <div className="w-full max-w-sm md:max-w-2xl flex flex-col flex-1 h-screen relative overflow-hidden md:bg-white md:shadow-sm md:border-x border-gray-100">
        
        {/* Header */}
        <div className="flex flex-col items-center pt-8 px-6 pb-2 shrink-0">
          <h1 className="text-[22px] font-bold text-gray-900 mb-5">Connections & Matches</h1>
          
          {/* Segmented Control */}
          <div className="w-full bg-white rounded-full p-1 flex items-center justify-between shadow-sm border border-gray-100 mb-2">
            {(['Matches', 'Requests', 'All'] as const).map((tab) => {
              const isRequestsTab = tab === 'Requests';
              const reqCount = requestsData.length;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`flex-1 text-[13px] font-bold rounded-full py-2 transition-colors relative flex items-center justify-center gap-1.5 ${
                    activeFilter === tab 
                      ? 'bg-[#1a3322] text-white' 
                      : 'bg-transparent text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span>{tab}</span>
                  {isRequestsTab && reqCount > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                      activeFilter === tab ? 'bg-amber-400 text-gray-900' : 'bg-[#1a3322] text-white'
                    }`}>
                      {reqCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable List Area */}
        <div className="flex-1 px-6 pb-28 md:pb-6 overflow-y-auto w-full">
          <div className="flex flex-col w-full h-full">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full mt-10">
                <div className="w-8 h-8 border-4 border-[#1a3322] border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-center text-sm font-medium text-[#1a3322]">Loading connections...</p>
              </div>
            ) : activeFilter === 'Requests' ? (
              requestsData.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center mt-16 px-4">
                  <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center shadow-xs mb-4 border border-amber-100">
                    <Sparkles size={28} className="text-amber-500" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-[17px] font-bold text-gray-900 mb-2">No Pending Requests</h2>
                  <p className="text-[13px] text-gray-500 leading-relaxed mb-6">
                    When someone likes your profile, their connection request will appear here for you to connect back!
                  </p>
                  <button 
                    onClick={() => navigate('/app/discover')}
                    className="bg-[#1a3322] text-white font-medium px-6 py-2.5 rounded-full text-xs hover:bg-[#122418] transition-colors shadow-sm"
                  >
                    Explore Discover Feed
                  </button>
                </div>
              ) : (
                requestsData.map((reqUser) => (
                  <RequestRow 
                    key={reqUser.id}
                    user={reqUser}
                    age={calculateAge(reqUser.dob)}
                    onConnectBack={handleConnectBack}
                    connectingId={connectingId}
                  />
                ))
              )
            ) : (activeFilter === 'Matches' ? matchesData : [...matchesData, ...requestsData]).length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center mt-20 px-4">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 border border-gray-100">
                  <HeartCrack size={36} className="text-gray-300" strokeWidth={1.5} />
                </div>
                <h2 className="text-[18px] font-bold text-gray-900 mb-2">No Matches Yet</h2>
                <p className="text-[14px] text-gray-500 leading-relaxed mb-8">
                  You haven't matched with anyone yet. Keep exploring the discovery feed to find faith-filled connections!
                </p>
                <button 
                  onClick={() => navigate('/app/discover')}
                  className="bg-[#1a3322] text-white font-medium px-8 py-3 rounded-full hover:bg-[#122418] transition-colors shadow-sm"
                >
                  Start Discovering
                </button>
              </div>
            ) : (
              matchesData.map((matchItem, idx) => {
                const matchUser = matchItem.user;
                const name = `${matchUser.first_name || ''} ${matchUser.last_name || ''}`.trim() || 'Anonymous';
                const age = calculateAge(matchUser.dob);
                const imageUrl = matchUser.photos && matchUser.photos.length > 0 ? matchUser.photos[0] : '/male1.png';
                const isNew = !matchItem.last_message;
                
                return (
                  <MatchRow 
                    key={matchUser.id || idx}
                    matchUser={matchUser}
                    name={name}
                    age={age}
                    profession={matchUser.denomination || 'Christian Faith'}
                    location={'Local area'}
                    imageUrl={imageUrl}
                    isNewMatch={isNew}
                  />
                );
              })
            )}
          </div>
        </div>

        {/* Bottom Nav Bar */}
        <BottomNavBar />
      </div>
    </div>
  );
};
