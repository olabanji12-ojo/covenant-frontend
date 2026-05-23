import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavBar } from '../../components/navigation/BottomNavBar';

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
  name,
  age,
  profession,
  location,
  imageUrl,
  isNewMatch = true,
}: MatchRowProps) => {
  const navigate = useNavigate();

  return (
    // Clicking the whole row navigates to the profile detail screen!
    <div 
      onClick={() => navigate('/app/profile-detail')}
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

  // Hardcoded dummy data strictly matching your Figma screenshot!
  const matchesData = [
    { name: 'Jerry', age: 29, profession: 'Engineer', location: 'Osogbo, Osun', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
    { name: 'Lydia', age: 25, profession: 'Nurse', location: 'Ikirun, Osun', imageUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
    { name: 'Joy', age: 24, profession: 'Doctor', location: 'Osogbo, Osun', imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
    { name: 'Jimmy', age: 26, profession: 'Engineer', location: 'VI, Lagos', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
    { name: 'Shola', age: 29, profession: 'Teacher', location: 'Maryland, Lagos', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
    { name: 'Adams', age: 30, profession: 'Lawyer', location: 'Bariga, Lagos', imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
    { name: 'Victoria', age: 26, profession: 'Graphic Designer', location: 'Ikeja, Lagos', imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
    { name: 'Daniel', age: 29, profession: 'Youth Pastor', location: 'Ikoyi, Lagos', imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
    { name: 'Samantha', age: 28, profession: 'Entrepreneur', location: 'Ajah, Lagos', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
  ];

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
          <div className="flex flex-col w-full">
            {matchesData.map((match, idx) => (
              <MatchRow 
                key={idx}
                name={match.name}
                age={match.age}
                profession={match.profession}
                location={match.location}
                imageUrl={match.imageUrl}
                isNewMatch={true}
              />
            ))}
          </div>
        </div>

        {/* Bottom Nav Bar */}
        <BottomNavBar />
      </div>
    </div>
  );
};
