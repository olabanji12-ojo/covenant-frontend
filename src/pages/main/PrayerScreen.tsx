import { useState } from 'react';
import { BottomNavBar } from '../../components/navigation/BottomNavBar';

export const PrayerScreen = () => {
  // State for the custom top segmented control
  const [activeFilter, setActiveFilter] = useState<'Pray' | 'Prayed for me' | 'Answered'>('Pray');

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f5f0] w-full max-w-sm mx-auto relative overflow-hidden pb-28">
      
      {/* Header Section */}
      <div className="flex flex-col items-center pt-8 px-6 pb-2 w-full shrink-0">
        <h1 className="text-[22px] font-bold text-gray-900 mb-5">Prayer</h1>
        
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
      <div className="flex-1 px-6 pt-8 overflow-y-auto w-full custom-scrollbar flex flex-col items-center">
        
        <h2 className="text-[22px] font-bold text-gray-900 mb-2">Send a prayer</h2>
        <p className="text-[12px] text-gray-500 font-medium text-center leading-snug px-4 mb-8">
          Lift others up in prayer and encourage their journey.
        </p>

        {/* Prayer Request Card */}
        <div className="w-full bg-[#fdfaf0] rounded-2xl p-5 flex flex-col gap-5 shadow-sm mb-5 border border-[#f3ead1]">
          <div className="flex items-start gap-4">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
              alt="Samantha" 
              className="w-14 h-14 rounded-full object-cover shrink-0 shadow-sm"
            />
            <div className="flex flex-col pt-0.5">
              <h3 className="text-[16px] font-bold text-gray-900 mb-1 leading-none">Samantha</h3>
              <p className="text-[12px] text-gray-600 font-medium leading-tight">
                Ask God to guide her<br />decision and bless<br />her today.
              </p>
            </div>
          </div>
          
          <button className="w-full bg-[#1a3322] text-white font-medium text-[13px] rounded-full py-3.5 hover:bg-[#122418] transition-colors shadow-sm">
            Send Prayer
          </button>
        </div>

        {/* Verse Card */}
        <div className="w-full bg-[#fdfaf0] rounded-2xl p-5 flex items-center justify-between shadow-sm border border-[#f3ead1]">
          <div className="flex flex-col max-w-[75%]">
            <p className="text-[12px] text-gray-600 font-medium leading-snug mb-2">
              "Carry each other's burdens,<br />
              and in this way you will fulfill<br />
              the law of Christ"
            </p>
            <span className="text-[11px] font-bold text-[#489954]">Galatians 6:2</span>
          </div>
          <div className="text-[34px] pr-2 opacity-90 drop-shadow-sm">
            📖
          </div>
        </div>

      </div>

      {/* Bottom Nav Bar */}
      <BottomNavBar />
      
    </div>
  );
};
