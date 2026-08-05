import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '../../components/ui/Button';
import { guestLoginUser } from '../../store/authSlice';
import type { AppDispatch } from '../../store';

export const WelcomeScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleGuestClick = async () => {
    try {
      const resultAction = await dispatch(guestLoginUser());
      if (guestLoginUser.fulfilled.match(resultAction)) {
        navigate('/app/discover');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col justify-between relative bg-cover bg-center md:items-center md:justify-center md:py-12"
      // Using the background image you downloaded!
      style={{ backgroundImage: "url('/Home-screen.jpg')" }}
    >
      <div className="w-full max-w-sm flex flex-col h-full justify-between md:h-auto md:gap-20 md:bg-white/65 md:p-10 md:rounded-3xl md:backdrop-blur-lg md:border md:border-white/35 md:shadow-2xl">
      {/* Top Section */}
      <div className="flex flex-col items-center mt-20 md:mt-0">
        
        {/* Logo Container: We overlap the Love and Cross images here */}
        <div className="relative w-[110px] h-[110px] mb-4 flex items-center justify-center">
          <img 
            src="/Love.png" 
            alt="Heart" 
            className="absolute inset-0 w-full h-full object-contain" 
          />
          {/* The z-10 makes sure the cross is drawn ON TOP of the heart */}
          <img 
            src="/Cross.png" 
            alt="Cross" 
            // We use relative positioning here so it sits inside the flex center, and bump it up slightly (mb-4) to fit perfectly in the top arches of the heart
            className="relative z-10 w-[30px] h-[30px] object-contain mb-4" 
          />
        </div>
        
        <h1 className="text-[20px] font-semibold text-primary tracking-wide">
          Faith. Love. purpose
        </h1>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col items-center w-full px-6 pb-12 gap-4">
        {/* Because we built the <Button> component earlier, this is incredibly easy! */}
        <Button variant="primary" onClick={() => navigate('/signup')}>
          Create account
        </Button>
        <Button variant="secondary" onClick={() => navigate('/login')}>
          Sign in
        </Button>
        
        <button onClick={handleGuestClick} className="mt-4 text-[15px] font-medium text-white md:text-[#1a3322] hover:text-gray-200 md:hover:text-[#2d593c] transition-colors">
          Explore as Guest
        </button>
      </div>
      </div>
    </div>
  );
};
