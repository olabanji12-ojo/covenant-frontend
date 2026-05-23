import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Users, MapPin, Droplet, HeartHandshake, UserRoundSearch, UserSearch } from 'lucide-react';
import { RangeSlider } from '../../components/ui/RangeSlider';

// ==========================================
// REUSABLE COMPONENT: FilterRow
// ==========================================
interface FilterRowProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

const FilterRow: React.FC<FilterRowProps> = ({ icon, title, value }) => {
  return (
    <div className="w-full flex items-center justify-between py-5 border-b border-gray-300 last:border-0 cursor-pointer hover:opacity-70 transition-opacity">
      <div className="flex items-start gap-4">
        <div className="text-gray-900 shrink-0 mt-0.5">
          {icon}
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-[14px] text-gray-900 mb-1 leading-none">{title}</span>
          <span className="text-[12px] text-gray-500 font-medium leading-none">{value}</span>
        </div>
      </div>
      <ChevronRight className="text-gray-900 shrink-0" size={20} strokeWidth={1.5} />
    </div>
  );
};

export const FiltersScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen bg-[#f7f5f0] w-full max-w-sm mx-auto relative overflow-hidden pb-8">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-10 pb-6 w-full shrink-0">
        <button onClick={() => navigate(-1)} className="text-gray-900 hover:opacity-70 transition-opacity -ml-1">
          <ChevronLeft size={24} strokeWidth={1.5} />
        </button>
        <h1 className="text-[20px] font-bold text-gray-900 pl-4">Filters</h1>
        <button className="text-[#1a3322] font-bold text-[13px] hover:opacity-70 transition-opacity">
          Clear all
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col items-center w-full px-6">
        
        {/* Age Range Section */}
        <div className="w-full mb-8 mt-2">
          <RangeSlider 
            label={
              <div className="flex items-center gap-3">
                <Users size={20} className="text-gray-900" strokeWidth={2} />
                <span className="font-bold text-[14px] text-gray-900">Age Range</span>
              </div>
            }
            min={18}
            max={60}
            defaultValue={[22, 25]}
          />
        </div>

        {/* Filters List */}
        <div className="w-full flex flex-col mb-10">
          <FilterRow 
            icon={<MapPin size={22} strokeWidth={1.5} />} 
            title="Location" 
            value="Within 50 miles" 
          />
          <FilterRow 
            icon={<Droplet size={22} strokeWidth={1.5} />} 
            title="Denomination" 
            value="Any" 
          />
          <FilterRow 
            icon={<HeartHandshake size={22} strokeWidth={1.5} />} 
            title="Faith Commitment" 
            value="Very Committed" 
          />
          <FilterRow 
            icon={<UserRoundSearch size={22} strokeWidth={1.5} />} 
            title="Church Attendance" 
            value="Every week" 
          />
          <FilterRow 
            icon={<UserSearch size={22} strokeWidth={1.5} />} 
            title="Looking For" 
            value="Marriage" 
          />
        </div>

      </div>

      {/* Bottom Action Button */}
      <div className="px-6 w-full shrink-0">
        <button onClick={() => navigate('/app/matches')} className="w-full bg-[#1a3322] text-white font-medium text-[15px] rounded-full py-[18px] shadow-md hover:bg-[#122418] transition-colors mb-2">
          Show Matches (50)
        </button>
      </div>

    </div>
  );
};
