import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../store/authSlice';
import type { AppDispatch, RootState } from '../../store';
import { StepProgressIndicator } from '../../components/navigation/StepProgressIndicator';
import { SelectionCard } from '../../components/forms/SelectionCard';
import { Button } from '../../components/ui/Button';

export const IntentionsScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const previousState = location.state || {};
  const [intention, setIntention] = useState('Looking for Marriage');

  return (
    <div className="min-h-screen bg-[#f7f5f0] flex flex-col items-center py-10 px-6">
      <div className="w-full max-w-sm flex flex-col flex-1 min-h-[calc(100vh-5rem)]">
        
        {/* Progress Bar: We pass currentStep={2} so the first TWO dashes are black! */}
        <div className="w-full flex justify-center mb-10 mt-2">
          <StepProgressIndicator totalSteps={3} currentStep={2} />
        </div>

        {/* Header Section */}
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-[26px] font-bold text-gray-900 mb-3 text-center">
            What are your intentions?
          </h1>
          <p className="text-[15px] text-gray-500 text-center px-2 leading-snug">
            We'll show your profile to profile<br />with similar goals.
          </p>
        </div>

        {/* Selection Cards Component reuse! */}
        <div className="w-full space-y-4 mb-8">
          <SelectionCard 
            label="Looking for Marriage"
            // We pass your exact SVGs right into the icon prop!
            icon={<img src="/diamond-ring 1.svg" alt="Ring" className="w-[22px] h-[22px] object-contain" />}
            selected={intention === 'Looking for Marriage'}
            onClick={() => setIntention('Looking for Marriage')}
          />

          <SelectionCard 
            label="Serious Relationship"
            icon={<img src="/heart (3) 1.svg" alt="Heart" className="w-[22px] h-[22px] object-contain" />}
            selected={intention === 'Serious Relationship'}
            onClick={() => setIntention('Serious Relationship')}
          />

          <SelectionCard 
            label="Friendship with purpose"
            icon={<img src="/friend 1.svg" alt="Friends" className="w-[22px] h-[22px] object-contain" />}
            selected={intention === 'Friendship with purpose'}
            onClick={() => setIntention('Friendship with purpose')}
          />
        </div>

        {/* Footer Section */}
        <div className="mt-auto pt-10 pb-4 w-full flex flex-col items-center gap-5">
          <Button 
            variant="primary" 
            disabled={isLoading}
            onClick={async () => {
              const updateData = {
                ...previousState,
                intentions: intention
              };
              await dispatch(updateUserProfile(updateData));
              navigate('/add-photos');
            }}
          >
            {isLoading ? 'Saving...' : 'Continue'}
          </Button>
          
          <button onClick={() => navigate('/add-photos')} className="text-[15px] font-medium text-gray-500 hover:text-gray-700 transition-colors">
            Skip for now
          </button>
        </div>

      </div>
    </div>
  );
};
