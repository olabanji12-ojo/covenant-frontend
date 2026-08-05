import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Heart } from 'lucide-react';
import type { RootState } from '../../store';

export const MatchSuccessScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authUser = useSelector((state: RootState) => state.auth.user);

  const matchUser = location.state?.matchUser;
  const matchFirstName = matchUser ? (matchUser.first_name || matchUser.name || '').split(' ')[0] : 'Mary';
  const matchAvatar = matchUser?.photos?.[0] || '/female1.jpg';
  const authAvatar = authUser?.photos?.[0] || '/male1.png';

  const handleSendMessage = () => {
    if (matchUser?.id) {
      navigate(`/app/chat/${matchUser.id}`, { state: { matchUser } });
    } else {
      navigate('/app/chat');
    }
  };

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
            You and {matchFirstName}<br />liked each other.
          </p>
        </div>

        {/* The Overlapping Avatar Collage */}
        <div className="relative flex justify-center items-center h-[160px] w-full mt-10 mb-12">
          <div className="relative flex items-center justify-center w-full">
            
            {/* Left Avatar (User - authAvatar) */}
            {/* translate-x-4 pushes it to the right so they overlap */}
            <img 
              src={authAvatar} 
              alt="You" 
              className="w-[140px] h-[140px] rounded-full object-cover border-[4px] border-white z-10 shadow-lg translate-x-4 bg-white"
            />
            
            {/* Right Avatar (Match User - matchAvatar) */}
            {/* -translate-x-4 pushes it to the left so they overlap */}
            {/* No border on the right one to match the screenshot! */}
            <img 
              src={matchAvatar} 
              alt={matchFirstName} 
              className="w-[140px] h-[140px] rounded-full object-cover z-0 shadow-lg -translate-x-4"
            />
            
            {/* The Heart Badge perfectly centered between them! */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[44px] h-[44px] bg-white rounded-full flex items-center justify-center shadow-md">
              <Heart className="text-[#1a3322] fill-[#1a3322]" size={22} strokeWidth={2} />
            </div>
            
          </div>
        </div>

        {/* Subtext & Icebreaker Prompt */}
        <div className="flex flex-col items-center justify-center w-full mb-8 px-4">
          <p className="text-[14px] font-medium text-white/90 text-center leading-relaxed max-w-[260px] mb-3">
            You both share strong faith values and aligned heart postures.
          </p>
          
          {matchUser?.icebreaker_prompt && (
            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-3.5 text-center w-full max-w-[280px]">
              <span className="text-[10px] font-bold text-amber-200 uppercase tracking-wider block mb-1">
                💬 Shared Icebreaker Topic
              </span>
              <p className="text-[12px] font-semibold text-white leading-snug">
                "{matchUser.icebreaker_prompt}"
              </p>
            </div>
          )}
        </div>

        {/* Footer Action Buttons */}
        <div className="mt-auto pt-6 pb-8 w-full flex flex-col items-center gap-4 px-2">
          
          {/* Send a Message Button (Solid Dark Green) */}
          <button onClick={handleSendMessage} className="w-full bg-[#1a3322] text-white font-medium rounded-full py-[14px] shadow-md hover:bg-[#122418] transition-colors">
            Send a Message
          </button>
          
          <button onClick={() => navigate('/app/discover')} className="w-full bg-transparent border-[1.5px] border-white/80 text-white font-medium rounded-full py-[14px] hover:bg-white/10 transition-colors">
            Keep swiping
          </button>
          
        </div>

      </div>
    </div>
  );
};
