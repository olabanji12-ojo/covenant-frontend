import { SlidersHorizontal, X, Heart, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BottomNavBar } from '../../components/navigation/BottomNavBar';

export const DiscoverScreen = () => {
  const navigate = useNavigate();

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
              5 new matches today
            </span>
          </div>
        </div>

        {/* Swipe Card Area */}
        <div className="flex-1 px-4 flex flex-col items-center justify-center w-full">
          {/* The Main Card Container: Now split into two sections (flex-col)! */}
          <div className="w-full aspect-[3/4] max-h-[68vh] rounded-[32px] overflow-hidden shadow-md bg-[#fdfaf5] flex flex-col">
            
            {/* Top Section: Background Photo (Takes up most of the card) */}
            <div className="relative w-full flex-1">
              <img 
                src="/female1.jpg" 
                alt="Mary" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              {/* 93% Match Badge */}
              <div className="absolute top-5 right-5 bg-[#f7f5f0] px-3 py-1.5 rounded-xl flex flex-col items-center shadow-sm">
                <span className="text-[12px] font-bold text-[#489954] leading-none mb-0.5">93%</span>
                <span className="text-[8px] font-semibold text-[#489954] leading-none uppercase">Faith Match</span>
              </div>

              {/* User Info Overlay */}
              {/* Pinned to the bottom of the photo section */}
              <div className="absolute bottom-6 left-0 right-0 px-6 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-[24px] font-bold">Mary, 26</h2>
                  <CheckCircle2 size={18} className="text-white fill-[#489954]" />
                </div>
                
                <p className="text-[15px] font-bold mb-3">
                  Doctor, Ikoyi, Lagos
                </p>
                
                <p className="text-[13px] font-medium leading-snug pr-4">
                  "I can do all things through<br />Christ who strengthens me."<br />
                  <span className="font-bold text-[12px]">Philippians 4:13</span>
                </p>
              </div>
            </div>

            {/* Bottom Section: Action Area (Solid background, no photo) */}
            <div className="relative w-full h-[75px]">
              {/* Action Buttons */}
              {/* They sit perfectly on the border between the photo and the bottom section (-top-[25px]) */}
              <div className="absolute -top-[25px] left-0 right-0 flex justify-center gap-8 px-6">
                
                {/* Pray Button */}
                <div className="flex flex-col items-center gap-1.5">
                  <button className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center shadow-md hover:scale-105 transition-transform border border-gray-100">
                    <span className="text-[22px]">🙏</span>
                  </button>
                  <span className="text-[12px] font-bold text-[#489954]">Pray</span>
                </div>

                {/* Pass Button */}
                <div className="flex flex-col items-center gap-1.5">
                  <button className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center shadow-md hover:scale-105 transition-transform border border-gray-100 text-gray-900">
                    <X size={26} strokeWidth={2} />
                  </button>
                  <span className="text-[12px] font-bold text-[#489954]">Pass</span>
                </div>

                {/* Like Button */}
                <div className="flex flex-col items-center gap-1.5">
                  <button 
                    onClick={() => navigate('/app/match-success')}
                    className="w-[50px] h-[50px] rounded-full bg-[#1a3322] flex items-center justify-center shadow-md hover:scale-105 transition-transform text-white border border-[#1a3322]">
                    <Heart size={22} strokeWidth={2.5} className="fill-white" />
                  </button>
                  <span className="text-[12px] font-bold text-[#489954]">Like</span>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Bottom Nav Bar Integration! */}
        <BottomNavBar />
      </div>
    </div>
  );
};
