import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronLeft, Users, MapPin, Sparkles } from 'lucide-react';
import { RangeSlider } from '../../components/ui/RangeSlider';
import { SelectDropdown } from '../../components/ui/SelectDropdown';
import { updateUserProfile, fetchCurrentUser } from '../../store/authSlice';
import type { RootState, AppDispatch } from '../../store';

export const FiltersScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  // Initialize local state from Redux user state
  const [ageRange, setAgeRange] = useState<[number, number]>([
    user?.min_age_pref || 22,
    user?.max_age_pref || 35
  ]);
  const [distance, setDistance] = useState<number>(user?.max_distance || 50);
  const [denomination, setDenomination] = useState<string>(user?.denomination || 'any');
  const [faithCommitment, setFaithCommitment] = useState<string>(
    user?.prayer_freq || 'any'
  );
  const [churchAttendance, setChurchAttendance] = useState<string>(
    user?.church_freq || 'any'
  );
  const [intentions, setIntentions] = useState<string>(user?.intentions || 'any');

  // Keep state synced with user data once loaded
  useEffect(() => {
    if (user) {
      setAgeRange([user.min_age_pref || 22, user.max_age_pref || 35]);
      setDistance(user.max_distance || 50);
      setDenomination(user.denomination || 'any');
      setFaithCommitment(user.prayer_freq || 'any');
      setChurchAttendance(user.church_freq || 'any');
      setIntentions(user.intentions || 'any');
    }
  }, [user]);

  const handleSave = async () => {
    const preferences = {
      min_age_pref: ageRange[0],
      max_age_pref: ageRange[1],
      max_distance: distance,
      denomination: denomination,
      prayer_freq: faithCommitment,
      church_freq: churchAttendance,
      intentions: intentions
    };

    try {
      await dispatch(updateUserProfile(preferences)).unwrap();
      // Dynamically fetch current user again to ensure Redux is perfectly fresh
      await dispatch(fetchCurrentUser());
      navigate('/app/discover');
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  };

  const handleClearAll = () => {
    setAgeRange([18, 60]);
    setDistance(50);
    setDenomination('any');
    setFaithCommitment('any');
    setChurchAttendance('any');
    setIntentions('any');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f5f0] w-full max-w-sm mx-auto relative overflow-hidden pb-8">

      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-10 pb-6 w-full shrink-0">
        <button onClick={() => navigate(-1)} className="text-gray-900 hover:opacity-70 transition-opacity -ml-1">
          <ChevronLeft size={24} strokeWidth={1.5} />
        </button>
        <h1 className="text-[20px] font-bold text-gray-900 pl-4">Filters</h1>
        <button
          onClick={handleClearAll}
          className="text-[#1f3d28] font-bold text-[13px] hover:opacity-70 transition-opacity"
        >
          Clear all
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col items-center w-full px-6 pb-24">

        {/* Age Range Section */}
        <div className="w-full bg-white/60 backdrop-blur-sm rounded-[24px] border border-white/40 p-5 mb-6 shadow-sm mt-2">
          <RangeSlider
            label={
              <div className="flex items-center gap-3">
                <Users size={18} className="text-[#1f3d28]" strokeWidth={2} />
                <span className="font-bold text-[14px] text-gray-900">Age Range</span>
              </div>
            }
            min={18}
            max={60}
            defaultValue={ageRange}
            onChange={(val) => setAgeRange(val)}
          />
        </div>

        {/* Distance Section */}
        <div className="w-full bg-white/60 backdrop-blur-sm rounded-[24px] border border-white/40 p-5 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-[#1f3d28]" strokeWidth={2} />
              <span className="font-bold text-[14px] text-gray-900">Maximum Distance</span>
            </div>
            <span className="text-sm font-semibold text-gray-500">
              Within {distance} miles
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="100"
            step="5"
            value={distance}
            onChange={(e) => setDistance(parseInt(e.target.value))}
            className="w-full h-[3px] bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1f3d28] outline-none"
            style={{
              background: `linear-gradient(to right, #1f3d28 0%, #1f3d28 ${((distance - 5) / 95) * 100}%, #e5e7eb ${((distance - 5) / 95) * 100}%, #e5e7eb 100%)`
            }}
          />
        </div>

        {/* Categorical Dropdowns List */}
        <div className="w-full bg-white/60 backdrop-blur-sm rounded-[24px] border border-white/40 p-5 space-y-5 shadow-sm">

          <SelectDropdown
            label="Denomination"
            placeholder="Any"
            value={denomination}
            onChange={(e) => setDenomination(e.target.value)}
            options={[
              { value: 'any', label: 'Any' },
              { value: 'catholic', label: 'Catholic' },
              { value: 'protestant', label: 'Protestant' },
              { value: 'orthodox', label: 'Orthodox' },
              { value: 'non_denominational', label: 'Non-Denominational' },
              { value: 'other', label: 'Other' }
            ]}
            className="rounded-[14px] py-3 text-[13px] font-medium"
          />

          <SelectDropdown
            label="Faith Commitment"
            placeholder="Any"
            value={faithCommitment}
            onChange={(e) => setFaithCommitment(e.target.value)}
            options={[
              { value: 'any', label: 'Any' },
              { value: 'multiple_daily', label: 'Multiple times a day' },
              { value: 'daily', label: 'Daily' },
              { value: 'weekly', label: 'Weekly' },
              { value: 'rarely', label: 'Rarely' }
            ]}
            className="rounded-[14px] py-3 text-[13px] font-medium"
          />

          <SelectDropdown
            label="Church Attendance"
            placeholder="Any"
            value={churchAttendance}
            onChange={(e) => setChurchAttendance(e.target.value)}
            options={[
              { value: 'any', label: 'Any' },
              { value: 'multiple', label: 'Multiple times a week' },
              { value: 'weekly', label: 'Weekly' },
              { value: 'monthly', label: 'Monthly' },
              { value: 'rarely', label: 'Rarely' }
            ]}
            className="rounded-[14px] py-3 text-[13px] font-medium"
          />

          <SelectDropdown
            label="Looking For"
            placeholder="Any"
            value={intentions}
            onChange={(e) => setIntentions(e.target.value)}
            options={[
              { value: 'any', label: 'Any' },
              { value: 'Looking for Marriage', label: 'Marriage' },
              { value: 'Serious Relationship', label: 'Serious Relationship' },
              { value: 'Friendship with purpose', label: 'Friendship with purpose' }
            ]}
            className="rounded-[14px] py-3 text-[13px] font-medium"
          />
        </div>

      </div>

      {/* Bottom Action Button */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-4 bg-[#f7f5f0]/80 backdrop-blur-md border-t border-gray-100 w-full shrink-0 z-10">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="w-full bg-[#1f3d28] text-white font-bold text-[15px] rounded-full py-[16px] shadow-lg hover:bg-[#122418] transition-all transform active:scale-[0.99] flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <Sparkles size={16} />
              <span>Apply Filters & Discover</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};
