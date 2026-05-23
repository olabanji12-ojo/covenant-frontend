import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen w-full flex flex-col justify-between relative bg-cover bg-top"
      // Using the background image you downloaded!
      style={{ backgroundImage: "url('/Home-screen.jpg')" }}
    >
      {/* Top Section */}
      <div className="flex flex-col items-center mt-20">
        
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
        <Button variant="secondary" onClick={() => navigate('/app/discover')}>
          Sign in
        </Button>
        
        <button className="mt-4 text-[15px] font-medium text-white hover:text-gray-200 transition-colors">
          Explore as Guest
        </button>
      </div>
    </div>
  );
};
