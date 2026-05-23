import { useNavigate } from 'react-router-dom';
import { StepProgressIndicator } from '../../components/navigation/StepProgressIndicator';
import { Button } from '../../components/ui/Button';
import { Plus } from 'lucide-react';

// A simple internal component just for this screen
const PhotoUploadSlot = ({ imageUrl }: { imageUrl?: string }) => {
  // If we have an image URL, we render a filled square
  if (imageUrl) {
    return (
      <div className="relative w-full aspect-square rounded-[16px] overflow-hidden shadow-sm">
        <img 
          src={imageUrl} 
          alt="Uploaded Profile" 
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // If there is no image URL, we render the empty dashed box state!
  return (
    <button 
      type="button"
      className="relative w-full aspect-square rounded-[16px] bg-[#f0f0f0]/50 border-[1.5px] border-dashed border-gray-300 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
    >
      <Plus size={32} className="text-gray-500" strokeWidth={1.5} />
    </button>
  );
};

export const AddPhotosScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#f7f5f0] flex flex-col items-center py-10 px-6">
      <div className="w-full max-w-sm flex flex-col flex-1 min-h-[calc(100vh-5rem)]">
        
        {/* Progress Bar (Step 3 of 3) - All three dashes will be solid black! */}
        <div className="w-full flex justify-center mb-10 mt-2">
          <StepProgressIndicator totalSteps={3} currentStep={3} />
        </div>

        {/* Header Section */}
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-[26px] font-bold text-gray-900 mb-3 text-center">
            Add your photos
          </h1>
          <p className="text-[15px] text-gray-500 text-center px-4 leading-snug">
            Add at least 1 photo so others can<br />get to know.
          </p>
        </div>

        {/* 2x2 Photo Grid Layout */}
        <div className="w-full grid grid-cols-2 gap-4 mb-8">
          {/* Slot 1: Filled with a dummy image from Unsplash to match your screenshot! */}
          <PhotoUploadSlot imageUrl="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" />
          
          {/* Slots 2, 3, 4: Empty dashed borders waiting for uploads */}
          <PhotoUploadSlot />
          <PhotoUploadSlot />
          <PhotoUploadSlot />
        </div>

        {/* Footer Section */}
        <div className="mt-auto pt-10 pb-4 w-full flex flex-col items-center gap-5">
          <Button variant="primary" onClick={() => navigate('/review-info')}>
            Continue
          </Button>
          
          <button onClick={() => navigate('/review-info')} className="text-[15px] font-medium text-gray-500 hover:text-gray-700 transition-colors">
            Skip for now
          </button>
        </div>

      </div>
    </div>
  );
};
