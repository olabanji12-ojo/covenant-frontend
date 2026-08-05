import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepProgressIndicator } from '../../components/navigation/StepProgressIndicator';
import { SelectDropdown } from '../../components/ui/SelectDropdown';
import { Button } from '../../components/ui/Button';

export const FaithProfileScreen = () => {
  const navigate = useNavigate();
  const [denomination, setDenomination] = useState('');
  const [church_freq, setChurchFreq] = useState('');
  const [prayer_freq, setPrayerFreq] = useState('');
  const [bible_freq, setBibleFreq] = useState('');

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
          <SelectDropdown 
            label="Denomination / Church Tradition"
            placeholder="Select denomination"
            value={denomination}
            onChange={(e) => setDenomination(e.target.value)}
            options={[
              { value: 'Pentecostal / Charismatic', label: 'Pentecostal / Charismatic' },
              { value: 'Evangelical', label: 'Evangelical' },
              { value: 'Non-Denominational', label: 'Non-Denominational' },
              { value: 'Baptist', label: 'Baptist' },
              { value: 'Catholic', label: 'Catholic' },
              { value: 'Anglican / Episcopal', label: 'Anglican / Episcopal' },
              { value: 'Presbyterian / Reformed', label: 'Presbyterian / Reformed' },
              { value: 'Methodist', label: 'Methodist' },
              { value: 'Lutheran', label: 'Lutheran' },
              { value: 'Orthodox', label: 'Orthodox (Eastern / Coptic)' },
              { value: 'Seventh-day Adventist', label: 'Seventh-day Adventist' },
              { value: 'Other', label: 'Other Christian Tradition' }
            ]}
          />

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
              state: { denomination, church_freq, prayer_freq, bible_freq }
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
