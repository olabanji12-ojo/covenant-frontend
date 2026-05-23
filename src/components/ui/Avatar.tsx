import React from 'react';
import { User } from 'lucide-react';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  className?: string;
}

// Map our size props to exact Tailwind width/height classes
const sizeMap: Record<AvatarSize, string> = {
  sm: 'w-8 h-8',       // 32px (Good for small lists)
  md: 'w-12 h-12',     // 48px (Standard size)
  lg: 'w-16 h-16',     // 64px (Good for match lists like Jerry/Lydia)
  xl: 'w-24 h-24',     // 96px (Good for the main profile page)
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  className = ''
}) => {
  const sizeClasses = sizeMap[size];

  return (
    <div 
      className={`relative rounded-full overflow-hidden bg-gray-200 flex-shrink-0 flex items-center justify-center ${sizeClasses} ${className}`}
    >
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          // object-cover ensures the image perfectly fills the circle without stretching!
          className="w-full h-full object-cover"
        />
      ) : (
        // If no image is provided, we show a default gray user icon
        <User className="w-1/2 h-1/2 text-gray-400" />
      )}
    </div>
  );
};
