import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { Button } from '../../components/ui/Button';
import { User, Activity, Droplet, Church, TrendingUp } from 'lucide-react';

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
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  // Helper to calculate age from DOB
  const calculateAge = (dobString?: string) => {
    if (!dobString) return 'N/A';
    const dob = new Date(dobString);
    const diff_ms = Date.now() - dob.getTime();
    const age_dt = new Date(diff_ms); 
    return Math.abs(age_dt.getUTCFullYear() - 1970).toString();
  };

  // Safe fallback values
  const name = user ? `${user.first_name || ''} ${user.last_name || ''}`.trim() : 'N/A';
  const age = calculateAge(user?.dob);
  const denomination = user?.denomination || 'Not specified';
  const churchAttendance = user?.church_freq || 'Not specified';
  const faith = user?.prayer_freq || 'Growing'; // Using prayer_freq as proxy for faith
  const intentions = user?.intentions || 'Not specified';

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
            value={name} 
          />
          
          <ReviewRow 
            icon={<Activity size={18} strokeWidth={2} />} 
            label="Age" 
            value={age} 
          />
          
          <ReviewRow 
            icon={<Droplet size={18} strokeWidth={2} />} 
            label="Denomination" 
            value={denomination} 
          />
          
          <ReviewRow 
            icon={<Church size={18} strokeWidth={2} />} 
            label="Church Attendance" 
            value={churchAttendance} 
          />
          
          <ReviewRow 
            icon={<TrendingUp size={18} strokeWidth={2} />} 
            label="Faith" 
            value={faith} 
          />
          
          <ReviewRow 
            // We use the custom diamond ring SVG here!
            icon={<img src="/diamond-ring 1.svg" alt="Ring" className="w-[18px] h-[18px] object-contain" />} 
            label="Intentions" 
            value={intentions} 
          />
          
        </div>

        {/* Footer Section */}
        <div className="mt-auto pt-6 pb-4 w-full flex flex-col items-center gap-5">
          <Button variant="primary" onClick={() => navigate('/success')}>
            Looks Good!
          </Button>
          
          <button onClick={() => navigate('/add-photos')} className="text-[15px] font-bold text-[#1a3322] hover:text-[#2a5332] transition-colors">
            Edit information
          </button>
        </div>

      </div>
    </div>
  );
};
