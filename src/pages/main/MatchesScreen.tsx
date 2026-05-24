import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavBar } from '../../components/navigation/BottomNavBar';
import apiClient from '../../api/client';
import type { User, ApiResponse } from '../../types';
import { HeartCrack } from 'lucide-react';

// Yes! This is a completely reusable component. 
// When you connect your backend, you just pass real data into these props.
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
}: MatchRowProps & { matchUser: any }) => {
  const navigate = useNavigate();

  return (
    // Clicking the whole row navigates to the profile detail screen!
    <div 
      onClick={() => navigate('/app/profile-detail', { state: { user: matchUser, isMatch: true } })}
      className="flex items-center gap-4 py-3 border-b border-gray-200 last:border-0 w-full cursor-pointer hover:opacity-80 transition-opacity active:scale-[0.99]">
      {/* Avatar Container */}
      <div className="w-[52px] h-[52px] flex-shrink-0">
        <img 
          src={imageUrl} 
          alt={name} 
          // object-cover ensures the image fills the circle perfectly without stretching!
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
        
        {/* New Match Badge (Conditional render!) */}
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

export const MatchesScreen = () => {
  // State for the custom top segmented control
  const [activeFilter, setActiveFilter] = useState<'All' | 'New' | 'Prayed for'>('All');
  const [matchesData, setMatchesData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        // Fetching potential matches from our real backend instead of hardcoded data!
        const res = await apiClient.get<ApiResponse<User[]>>('/matches');
        if (res.data.data) {
          setMatchesData(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load matches:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  // Helper to get age
  const calculateAge = (dobString?: string) => {
    if (!dobString) return 29;
    const dob = new Date(dobString);
    // eslint-disable-next-line react-hooks/purity
    const diff_ms = Date.now() - dob.getTime();
    const age_dt = new Date(diff_ms); 
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f7f5f0] flex flex-col items-center">
      {/* We use h-screen and overflow-hidden on the main wrapper so ONLY the list scrolls, not the whole page! */}
      <div className="w-full max-w-sm flex flex-col flex-1 h-screen relative overflow-hidden">
        
        {/* Header (Sticky at top) */}
        <div className="flex flex-col items-center pt-8 px-6 pb-2 shrink-0">
          <h1 className="text-[22px] font-bold text-gray-900 mb-5">Matches</h1>
          
          {/* Segmented Control */}
          <div className="w-full bg-white rounded-full p-1 flex items-center justify-between shadow-sm border border-gray-100 mb-2">
            {(['All', 'New', 'Prayed for'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`flex-1 text-[13px] font-bold rounded-full py-2 transition-colors ${
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

        {/* Scrollable List Area */}
        {/* pb-24 adds padding at the bottom of the scroll area so the last item isn't hidden by the navbar */}
        <div className="flex-1 px-8 pb-28 overflow-y-auto w-full">
          <div className="flex flex-col w-full h-full">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full mt-10">
                <div className="w-8 h-8 border-4 border-[#1a3322] border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-center text-sm font-medium text-[#1a3322]">Finding your matches...</p>
              </div>
            ) : matchesData.length === 0 ? (
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
              matchesData.map((match, idx) => {
                const name = `${match.first_name || ''} ${match.last_name || ''}`.trim() || 'Anonymous';
                const age = calculateAge(match.dob);
                const imageUrl = match.photos && match.photos.length > 0 ? match.photos[0] : '/male1.png';
                
                return (
                  <MatchRow 
                    key={match.id || idx}
                    matchUser={match}
                    name={name}
                    age={age}
                    profession={'Professional'}
                    location={'Local area'}
                    imageUrl={imageUrl}
                    isNewMatch={true}
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
