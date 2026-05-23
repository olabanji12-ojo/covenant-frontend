import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface TopAppBarProps {
  title?: React.ReactNode;
  onBack?: () => void;
  showBack?: boolean;
  rightAction?: React.ReactNode;
  className?: string;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  title,
  onBack,
  showBack = true,
  rightAction,
  className = ''
}) => {
  return (
    // Fixed height, flex layout. bg-transparent by default so it inherits the app background
    <div className={`flex items-center justify-between px-4 py-3 w-full ${className}`}>
      
      {/* Left side: Back Button */}
      {/* We use a fixed width (w-12) for the sides to ensure the center title is perfectly mathematically centered */}
      <div className="w-12 flex justify-start">
        {showBack && (
          <button 
            onClick={onBack}
            className="p-1 -ml-2 rounded-full hover:bg-black/5 transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft className="w-[28px] h-[28px] text-gray-900" strokeWidth={1.5} />
          </button>
        )}
      </div>

      {/* Center: Title */}
      <div className="flex-1 flex justify-center items-center">
        {typeof title === 'string' ? (
          <h2 className="text-[17px] font-semibold text-gray-900">{title}</h2>
        ) : (
          title
        )}
      </div>

      {/* Right side: Action Button or Placeholder */}
      <div className="w-12 flex justify-end">
        {rightAction}
      </div>
      
    </div>
  );
};
