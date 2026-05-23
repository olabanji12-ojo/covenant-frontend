import { Button } from '../../components/ui/Button';

export const SuccessScreen = () => {
  return (
    <div className="min-h-screen bg-[#f7f5f0] flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-sm flex flex-col flex-1 min-h-[calc(100vh-6rem)]">
        
        {/* The Hero Image (Strictly reusing Love.png and Cross.png as requested!) */}
        <div className="flex justify-center w-full mt-12 mb-8">
          <div className="relative flex justify-center items-center">
            {/* The Heart Image */}
            <img 
              src="/Love.png" 
              alt="Heart Background" 
              className="w-[140px] h-auto object-contain z-0"
            />
            {/* The Cross perfectly centered inside it */}
            <img 
              src="/Cross.png" 
              alt="Cross Logo" 
              className="absolute w-[44px] h-[44px] object-contain z-10 -mt-2"
            />
          </div>
        </div>

        {/* Header Section (Perfectly Centered text as requested!) */}
        <div className="flex flex-col items-center mb-10 w-full">
          <h1 className="text-[28px] font-bold text-gray-900 mb-4 text-center leading-tight">
            Welcome to<br />Covenant! 🤩
          </h1>
          <p className="text-[15px] text-gray-500 text-center leading-relaxed px-2 max-w-[320px]">
            You're all set! You can now explore matches, send likes, and build meaningful connections rooted in faith.
          </p>
        </div>

        {/* Footer Section */}
        <div className="mt-auto pt-6 pb-4 w-full flex flex-col items-center gap-5">
          <Button variant="primary">
            Start Discovering
          </Button>
          
          {/* Note the text color is primary (#1a3322) here! */}
          <button className="text-[15px] font-bold text-[#1a3322] hover:text-[#2a5332] transition-colors">
            Go to Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};
