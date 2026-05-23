import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, Heart } from 'lucide-react';

// ==========================================
// REUSABLE COMPONENT: ScriptureCard
// ==========================================
interface ScriptureCardProps {
  reference: string;
  text: string;
  emoji: string;
}

const ScriptureCard: React.FC<ScriptureCardProps> = ({ reference, text, emoji }) => {
  // Let's add some interactive state just to make the UI feel alive!
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="w-full bg-[#fdfaf0] rounded-2xl p-5 flex gap-4 shadow-sm mb-4 relative border border-[#f3ead1]">
      
      {/* Left Emoji/Graphic Area */}
      <div className="w-6 h-6 shrink-0 flex justify-center text-[22px] mt-0.5">
        {emoji}
      </div>
      
      {/* Text Content */}
      <div className="flex flex-col pr-8">
        <h3 className="font-bold text-[14px] text-gray-900 mb-1 leading-tight">{reference}</h3>
        {/* We use a very light gray for the verse text so it matches your design perfectly */}
        <p className="text-[12px] text-gray-600 leading-snug font-medium">
          "{text}"
        </p>
      </div>

      {/* Heart Button */}
      <button 
        onClick={() => setIsLiked(!isLiked)}
        className={`absolute top-4 right-5 transition-colors ${isLiked ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'}`}
      >
        <Heart size={18} strokeWidth={2} className={isLiked ? 'fill-red-500' : ''} />
      </button>

    </div>
  );
};

export const ShareScriptureScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Dummy Data straight from your Figma Screenshot
  const verses = [
    {
      reference: 'Jeremiah 29:11',
      text: 'For, i know the plans i have for you" declares the lord, "plans to prosper you and not to harm you, plans to give you hope and a future.',
      emoji: '🕊️'
    },
    {
      reference: '1 Corinthians 13:4-7',
      text: 'Love is patient, love is kind, it does not envy, it does not boast, it is not proud....',
      emoji: '🙏🏼'
    },
    {
      reference: 'Philippians 4:13',
      text: 'i can do all things through Christ who strengthens me.',
      emoji: '✝️'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f5f0] w-full max-w-sm mx-auto overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-10 pb-6 w-full">
        <button onClick={() => navigate(-1)} className="text-gray-900 hover:opacity-70 transition-opacity -ml-1">
          <ChevronLeft size={24} strokeWidth={1.5} />
        </button>
        <h1 className="text-[20px] font-bold text-gray-900">Share Scripture</h1>
        <div className="w-[24px]" /> {/* Empty div perfectly balances the left icon for true centering */}
      </div>

      <div className="px-6 flex-1 flex flex-col w-full">
        
        {/* Search Bar */}
        <div className="relative w-full mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} strokeWidth={2.5} />
          <input 
            type="text" 
            placeholder="Search for a verse"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-[1.5px] border-gray-300 rounded-full py-2.5 pl-11 pr-4 text-[13px] font-medium text-gray-900 outline-none focus:border-[#489954] transition-colors placeholder:text-gray-400"
          />
        </div>

        {/* Section Title */}
        <h2 className="text-[15px] font-bold text-gray-900 mb-4">Popular Verses</h2>

        {/* Scrollable List of Verses */}
        {/* We give it overflow-y-auto so ONLY the list scrolls, keeping the search bar pinned! */}
        <div className="flex flex-col w-full overflow-y-auto custom-scrollbar pb-10">
          {verses.map((verse, idx) => (
            <ScriptureCard 
              key={idx}
              reference={verse.reference}
              text={verse.text}
              emoji={verse.emoji}
            />
          ))}
        </div>

      </div>

    </div>
  );
};
