import React from 'react';

interface StepProgressIndicatorProps {
  totalSteps: number;
  currentStep: number;
  className?: string;
}

export const StepProgressIndicator: React.FC<StepProgressIndicatorProps> = ({
  totalSteps,
  currentStep,
  className = ''
}) => {
  return (
    <div className={`flex items-center justify-center gap-3 w-full ${className}`}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        // If the step is equal to or less than the current step, it's green
        const isCompletedOrCurrent = stepNumber <= currentStep;
        
        return (
          <div 
            key={index}
            className={`h-1.5 w-12 rounded-full transition-all duration-300 ${
              isCompletedOrCurrent ? 'bg-gray-900' : 'bg-gray-200'
            }`}
          />
        );
      })}
    </div>
  );
};
