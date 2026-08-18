import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronLeft, Users, MapPin, Sparkles } from 'lucide-react';
import { RangeSlider } from '../../components/ui/RangeSlider';
import { SelectDropdown } from '../../components/ui/SelectDropdown';
import { updateUserProfile, fetchCurrentUser } from '../../store/authSlice';
import { NIGERIAN_DENOMINATIONS } from '../../constants/denominations';
import type { RootState, AppDispatch } from '../../store';

export const FiltersScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  // Initialize local state from Redux user state with smart fallbacks
  const [ageRange, setAgeRange] = useState<[number, number]>([
    user?.min_age_pref || 22,
    user?.max_age_pref || 35
  ]);
  const [distance, setDistance] = useState<number>(user?.max_distance || 50);

  const initialDenom = user?.preferred_denomination || user?.denomination || 'Any';
  const isStandardDenom = initialDenom === 'Any' || NIGERIAN_DENOMINATIONS.includes(initialDenom);

  const [selectedDenom, setSelectedDenom] = useState<string>(
    isStandardDenom ? initialDenom : 'Other'
  );
  const [customDenom, setCustomDenom] = useState<string>(
    isStandardDenom ? '' : initialDenom
  );

  const [churchFreq, setChurchFreq] = useState(
    user?.preferred_church_freq || user?.church_freq || 'Any'
  );
  const [faithCommitment, setFaithCommitment] = useState<string>(
    user?.prayer_freq || 'Any'
  );
  const [churchAttendance, setChurchAttendance] = useState<string>(
    user?.preferred_church_freq || user?.church_freq || 'Any'
  );
  const [intention, setIntention] = useState<string>(user?.intention || 'Any');
  const [partnerPrefText, setPartnerPrefText] = useState(user?.partner_pref_text || '');

  // Keep state synced with user data once loaded
  useEffect(() => {
    if (user) {
      setAgeRange([user.min_age_pref || 22, user.max_age_pref || 35]);
      setDistance(user.max_distance || 50);
      
      const userDenom = user.preferred_denomination || user.denomination || 'Any';
      const isKnown = userDenom === 'Any' || NIGERIAN_DENOMINATIONS.includes(userDenom);
      if (isKnown) {
        setSelectedDenom(userDenom);
        setCustomDenom('');
      } else {
        setSelectedDenom('Other');
        setCustomDenom(userDenom);
      }

      setChurchFreq(user.preferred_church_freq || user.church_freq || 'Any');
      setFaithCommitment(user.prayer_freq || 'Any');
      setChurchAttendance(user.preferred_church_freq || user.church_freq || 'Any');
      setIntention(user.intention || 'Any');
      setPartnerPrefText(user.partner_pref_text || '');
    }
  }, [user]);

  const handleSave = async () => {
    const finalDenom = selectedDenom === 'Other' 
      ? (customDenom.trim() || 'Other') 
      : selectedDenom;

    const preferences = {
      preferred_denomination: finalDenom,
      preferred_church_freq: churchFreq,
      min_age_pref: ageRange[0],
      max_age_pref: ageRange[1],
      max_distance: distance,
      prayer_freq: faithCommitment,
      church_freq: churchAttendance,
      intention: intention,
      partner_pref_text: partnerPrefText
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
    setSelectedDenom('Any');
    setCustomDenom('');
    setFaithCommitment('Any');
    setChurchAttendance('Any');
    setIntention('Any');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f5f0] w-full max-w-sm md:max-w-2xl mx-auto relative overflow-hidden pb-8 md:pb-6 md:bg-white md:shadow-sm md:border-x border-gray-100">

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

        {/* Location Section */}
        <div className="w-full bg-white/60 backdrop-blur-sm rounded-[24px] border border-white/40 p-5 mb-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <MapPin size={18} className="text-[#1f3d28]" strokeWidth={2} />
            <span className="font-bold text-[14px] text-gray-900">Preferred Location (City / State)</span>
          </div>
          <input
            type="text"
            placeholder="e.g. Lagos, Ibadan, Abuja, Port Harcourt, or Any"
            value={user?.bio ? '' : 'Any'}
            onChange={() => {}}
            className="w-full bg-white border border-gray-200 rounded-[12px] px-4 py-3 text-[13px] font-medium text-gray-900 focus:outline-none focus:border-[#1f3d28]"
          />
        </div>

        {/* Categorical Dropdowns List */}
        <div className="w-full bg-white/60 backdrop-blur-sm rounded-[24px] border border-white/40 p-5 space-y-5 shadow-sm">

          <div className="w-full flex flex-col gap-2">
            <SelectDropdown
              label="Denomination"
              placeholder="Any"
              value={selectedDenom}
              onChange={(e) => setSelectedDenom(e.target.value)}
              options={[
                { value: 'Any', label: 'Any Denomination' },
                ...NIGERIAN_DENOMINATIONS.map((d) => ({ value: d, label: d }))
              ]}
              className="rounded-[14px] py-3 text-[13px] font-medium"
            />

            {selectedDenom === 'Other' && (
              <div className="w-full flex flex-col gap-1.5 mt-1 animate-fadeIn">
                <label className="text-[12px] font-bold text-amber-900">
                  Specify Preferred Church / Ministry
                </label>
                <input
                  type="text"
                  placeholder="e.g. Grace Assembly International"
                  value={customDenom}
                  onChange={(e) => setCustomDenom(e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-[12px] px-4 py-2.5 text-[13px] font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1f3d28]/20 shadow-xs"
                />
              </div>
            )}
          </div>

          <SelectDropdown
            label="Faith Commitment"
            placeholder="Any"
            value={faithCommitment}
            onChange={(e) => setFaithCommitment(e.target.value)}
            options={[
              { value: 'Any', label: 'Any' },
              { value: 'Daily Quiet Time', label: 'Dedicated Daily Quiet Time' },
              { value: 'Constant Dialogue Throughout Day', label: 'Constant Dialogue Throughout Day' },
              { value: 'Weekly / Group Prayer', label: 'Weekly & Group Prayer' },
              { value: 'Growing in Consistency', label: 'Growing in Consistency' }
            ]}
            className="rounded-[14px] py-3 text-[13px] font-medium"
          />

          <SelectDropdown
            label="Church Attendance"
            placeholder="Any"
            value={churchAttendance}
            onChange={(e) => setChurchAttendance(e.target.value)}
            options={[
              { value: 'Any', label: 'Any' },
              { value: 'Weekly + Serve in Ministry', label: 'Weekly + Active in Ministry' },
              { value: 'Regular Weekly Attendee', label: 'Regular Weekly Attendee' },
              { value: '2-3 Times a Month', label: '2–3 Times a Month' },
              { value: 'Online / Remote Worship', label: 'Online / Remote Worship' },
              { value: 'Occasional / Special Events', label: 'Occasional / Special Events' }
            ]}
            className="rounded-[14px] py-3 text-[13px] font-medium"
          />

          <SelectDropdown
            label="Looking For"
            placeholder="Any"
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            options={[
              { value: 'Any', label: 'Any' },
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
