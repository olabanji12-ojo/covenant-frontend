import { Button } from '../../components/ui/Button';
import { CheckCircle2 } from 'lucide-react';

export const VerifyAccountScreen = () => {
  const benefits = [
    "Build trust and authenticity",
    "Keep our community safe",
    "Increase your chance of matching"
  ];

  return (
    <div className="min-h-screen bg-[#f7f5f0] flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-sm flex flex-col flex-1 min-h-[calc(100vh-6rem)]">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mt-8 mb-12">
          <h1 className="text-[26px] font-bold text-gray-900 mb-2 text-center">
            Verify your account
          </h1>
          <p className="text-[15px] text-gray-500 text-center">
            Let's make sure you're real.
          </p>
        </div>

        {/* Hero Image Composition: The 3 overlapping layers! */}
        <div className="flex justify-center w-full mb-16 mt-4">
          <div className="relative w-44 h-44">
            
            {/* 1. Base Shield Layer */}
            <img 
              src="/shield.png" 
              alt="Shield" 
              className="absolute inset-0 w-full h-full object-contain"
            />
            
            {/* 2. White Cross Layer */}
            <img 
              src="/white-cross.png" 
              alt="Cross" 
              // We use absolute positioning to center it. 
              // -translate-y-[55%] slightly shifts it up into the wider top part of the shield!
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[55%] w-16 h-16 object-contain z-10"
            />

            {/* 3. Verification Badge Layer */}
            <img 
              src="/verify-checked.png" 
              alt="Verified" 
              // We pin this to the absolute bottom-right corner!
              // Added bg-white and rounded-full just in case the PNG is transparent
              className="absolute -bottom-2 -right-4 w-20 h-20 object-contain rounded-full bg-white shadow-md z-20"
            />
          </div>
        </div>

        {/* Benefits Checklist (Centered Block) */}
        <div className="w-full flex flex-col items-center px-2">
          <div className="flex flex-col space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2 
                  size={20} 
                  className="text-white fill-[#1a3322]" 
                />
                <span className="text-[14.5px] font-medium text-[#1a3322]">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Section */}
        {/* mt-auto pushes everything to the bottom perfectly */}
        <div className="mt-auto pt-10 pb-4 w-full flex flex-col items-center gap-5">
          <Button variant="primary">
            Verify now
          </Button>
          
          <button className="text-[15px] font-medium text-gray-500 hover:text-gray-700 transition-colors">
            Skip for now
          </button>
        </div>

      </div>
    </div>
  );
};
