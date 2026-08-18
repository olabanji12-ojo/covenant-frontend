import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepProgressIndicator } from '../../components/navigation/StepProgressIndicator';
import { SelectDropdown } from '../../components/ui/SelectDropdown';
import { Button } from '../../components/ui/Button';
import { NIGERIAN_DENOMINATIONS } from '../../constants/denominations';

export const FaithProfileScreen = () => {
  const navigate = useNavigate();
  const [selectedDenomination, setSelectedDenomination] = useState('');
  const [customDenomination, setCustomDenomination] = useState('');
  const [church_freq, setChurchFreq] = useState('');
  const [prayer_freq, setPrayerFreq] = useState('');
  const [bible_freq, setBibleFreq] = useState('');

  const finalDenomination = selectedDenomination === 'Other' 
    ? (customDenomination.trim() || 'Other') 
    : selectedDenomination;

  return (
    <div className="min-h-screen bg-[#f7f5f0] flex flex-col items-center py-10 px-6">
      <div className="w-full max-w-sm flex flex-col flex-1 min-h-[calc(100vh-5rem)]">
        
        {/* 1. Reusable Progress Bar */}
        <div className="w-full flex justify-center mb-10 mt-2">
          <StepProgressIndicator totalSteps={3} currentStep={1} />
        </div>

        {/* Header Section */}
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-[26px] font-bold text-gray-900 mb-3 text-center">
            Tell us about your faith
          </h1>
          <p className="text-[15px] text-gray-500 text-center px-4 leading-snug">
            This helps us find better matches<br />with shared values.
          </p>
        </div>

        {/* 2. Form Inputs (Rich & Specific Options!) */}
        <div className="w-full space-y-5 mb-8">
          <div className="w-full flex flex-col gap-2">
            <SelectDropdown 
              label="Denomination / Church Tradition"
              placeholder="Select your church / denomination"
              value={selectedDenomination}
              onChange={(e) => setSelectedDenomination(e.target.value)}
              options={NIGERIAN_DENOMINATIONS.map((denom) => ({
                value: denom,
                label: denom,
              }))}
            />

            {selectedDenomination === 'Other' && (
              <div className="w-full flex flex-col gap-1.5 mt-2 animate-fadeIn">
                <label className="text-[13px] font-semibold text-amber-900">
                  Specify Your Church / Ministry Name
                </label>
                <input 
                  type="text"
                  placeholder="e.g. Grace Assembly International"
                  value={customDenomination}
                  onChange={(e) => setCustomDenomination(e.target.value)}
                  className="w-full h-12 px-4 bg-white border border-amber-300 rounded-xl text-[14.5px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8C1D40]/30 shadow-xs"
                />
              </div>
            )}
          </div>

          <SelectDropdown 
            label="Church Engagement & Attendance"
            placeholder="Select church engagement"
            value={church_freq}
            onChange={(e) => setChurchFreq(e.target.value)}
            options={[
              { value: 'Weekly + Serve in Ministry', label: 'Weekly + Active in Ministry / Leadership' },
              { value: 'Regular Weekly Attendee', label: 'Regular Weekly Attendee' },
              { value: '2-3 Times a Month', label: '2–3 Times a Month' },
              { value: 'Online / Remote Worship', label: 'Online / Remote Worship' },
              { value: 'Occasional / Special Events', label: 'Occasional / Special Events' }
            ]}
          />

          <SelectDropdown 
            label="Personal Prayer Life"
            placeholder="Select prayer rhythm"
            value={prayer_freq}
            onChange={(e) => setPrayerFreq(e.target.value)}
            options={[
              { value: 'Daily Quiet Time', label: 'Dedicated Daily Quiet Time' },
              { value: 'Constant Dialogue Throughout Day', label: 'Constant Dialogue Throughout Day' },
              { value: 'Weekly / Group Prayer', label: 'Weekly & Group Prayer' },
              { value: 'Growing in Consistency', label: 'Growing in Consistency' }
            ]}
          />

          <SelectDropdown 
            label="Spiritual Growth & Study Style"
            placeholder="Select Bible study preference"
            value={bible_freq}
            onChange={(e) => setBibleFreq(e.target.value)}
            options={[
              { value: 'Daily Scripture Reading', label: 'Daily Personal Bible Study' },
              { value: 'Small Group / Cell Group', label: 'Small Group & Cell Group Study' },
              { value: 'Worship, Prayer & Fasting', label: 'Worship, Prayer & Devotionals' },
              { value: 'Theological Books & Sermons', label: 'Theological Study & Sermons' }
            ]}
          />
        </div>

        {/* 3. Reusable Footer Section */}
        <div className="mt-auto pt-10 pb-4 w-full flex flex-col items-center gap-5">
          <Button variant="primary" onClick={() => {
            navigate('/covenant-assessment', {
              state: { denomination: finalDenomination, church_freq, prayer_freq, bible_freq }
            });
          }}>
            Continue
          </Button>
          
          <button onClick={() => navigate('/covenant-assessment')} className="text-[15px] font-medium text-gray-500 hover:text-gray-700 transition-colors">
            Skip for now
          </button>
        </div>

      </div>
    </div>
  );
};
