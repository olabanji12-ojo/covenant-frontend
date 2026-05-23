import React from 'react';
import { Heart } from 'lucide-react';

export const MatchSuccessScreen = () => {
  return (
    // Beautiful full-screen green gradient!
    <div className="min-h-screen bg-gradient-to-b from-[#3b5941] to-[#5a9c66] flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-sm flex flex-col flex-1 h-screen relative">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mt-12 mb-8">
          <h1 className="text-[28px] font-bold text-white mb-8 text-center leading-tight">
            It's a Match! 💚
          </h1>
          <p className="text-[16px] text-white text-center leading-snug">
            You and Mary<br />liked each other.
          </p>
        </div>

        {/* The Overlapping Avatar Collage */}
        <div className="relative flex justify-center items-center h-[160px] w-full mt-10 mb-12">
          <div className="relative flex items-center justify-center w-full">
            
            {/* Left Avatar (User - male1.png as requested!) */}
            {/* translate-x-4 pushes it to the right so they overlap */}
            <img 
              src="/male1.png" 
              alt="You" 
              className="w-[140px] h-[140px] rounded-full object-cover border-[4px] border-white z-10 shadow-lg translate-x-4 bg-white"
            />
            
            {/* Right Avatar (Mary - female1.jpg) */}
            {/* -translate-x-4 pushes it to the left so they overlap */}
            {/* No border on the right one to match the screenshot! */}
            <img 
              src="/female1.jpg" 
              alt="Mary" 
              className="w-[140px] h-[140px] rounded-full object-cover z-0 shadow-lg -translate-x-4"
            />
            
            {/* The Heart Badge perfectly centered between them! */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[44px] h-[44px] bg-white rounded-full flex items-center justify-center shadow-md">
              <Heart className="text-[#1a3322] fill-[#1a3322]" size={22} strokeWidth={2} />
            </div>
            
          </div>
        </div>

        {/* Subtext */}
        <div className="flex justify-center w-full mb-10">
          <p className="text-[15px] font-medium text-white text-center leading-relaxed max-w-[240px]">
            You both love the lord and<br />
            value a christ-centered<br />
            relationship.
          </p>
        </div>

        {/* Footer Action Buttons */}
        <div className="mt-auto pt-6 pb-8 w-full flex flex-col items-center gap-4 px-2">
          
          {/* Send a Message Button (Solid Dark Green) */}
          <button className="w-full bg-[#1a3322] text-white font-medium rounded-full py-[14px] shadow-md hover:bg-[#122418] transition-colors">
            Send a Message
          </button>
          
          {/* Keep Swiping Button (Hollow Outline) */}
          <button className="w-full bg-transparent border-[1.5px] border-white/80 text-white font-medium rounded-full py-[14px] hover:bg-white/10 transition-colors">
            Keep swiping
          </button>
          
        </div>

      </div>
    </div>
  );
};
