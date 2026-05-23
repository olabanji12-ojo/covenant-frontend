import React from 'react';
import { Button } from '../../components/ui/Button';
import { User, Activity, Droplet, Church, TrendingUp, MapPin } from 'lucide-react';

// Reusable row component just for this screen
interface ReviewRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const ReviewRow: React.FC<ReviewRowProps> = ({ icon, label, value }) => (
  <div className="flex items-center justify-between py-[18px]">
    <div className="flex items-center gap-4">
      {/* We fix the icon width to 5 so they all align perfectly vertically */}
      <div className="text-gray-800 flex items-center justify-center w-5">
        {icon}
      </div>
      <span className="text-[14px] font-bold text-gray-900">{label}</span>
    </div>
    {/* max-w-[100px] forces longer texts like "Looking for marriage" to wrap perfectly onto two lines! */}
    <span className="text-[14px] text-gray-500 font-medium text-right max-w-[100px] leading-snug">
      {value}
    </span>
  </div>
);

export const ReviewInfoScreen = () => {
  return (
    <div className="min-h-screen bg-[#f7f5f0] flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-sm flex flex-col flex-1 min-h-[calc(100vh-6rem)]">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-10 mt-6">
          <h1 className="text-[26px] font-bold text-gray-900 mb-3 text-center flex items-center gap-2">
            Almost there! <span className="text-[28px]">😉</span>
          </h1>
          <p className="text-[15px] text-gray-500 text-center px-2 leading-snug">
            Review your info and start your<br />journey with faith-filled connections
          </p>
        </div>

        {/* The Review Card Container */}
        <div className="w-full border border-gray-300 rounded-[20px] px-6 py-2 mb-8 bg-transparent">
          
          <ReviewRow 
            icon={<User size={18} strokeWidth={2} />} 
            label="Name" 
            value="John Doe" 
          />
          
          <ReviewRow 
            icon={<Activity size={18} strokeWidth={2} />} 
            label="Age" 
            value="29" 
          />
          
          <ReviewRow 
            icon={<Droplet size={18} strokeWidth={2} />} 
            label="Denomination" 
            value="Baptist" 
          />
          
          <ReviewRow 
            icon={<Church size={18} strokeWidth={2} />} 
            label="Church Attendance" 
            value="Every Sunday" 
          />
          
          <ReviewRow 
            icon={<TrendingUp size={18} strokeWidth={2} />} 
            label="Faith" 
            value="Growing" 
          />
          
          <ReviewRow 
            // We use the custom diamond ring SVG here!
            icon={<img src="/diamond-ring 1.svg" alt="Ring" className="w-[18px] h-[18px] object-contain" />} 
            label="Intentions" 
            value="Looking for marriage" 
          />
          
          <ReviewRow 
            icon={<MapPin size={18} strokeWidth={2} />} 
            label="Location" 
            value="Agege, Lagos" 
          />
          
        </div>

        {/* Footer Section */}
        <div className="mt-auto pt-6 pb-4 w-full flex flex-col items-center gap-5">
          <Button variant="primary">
            Looks Good!
          </Button>
          
          {/* Note the text color is primary (#1a3322) here, not gray! */}
          <button className="text-[15px] font-bold text-[#1a3322] hover:text-[#2a5332] transition-colors">
            Edit information
          </button>
        </div>

      </div>
    </div>
  );
};
