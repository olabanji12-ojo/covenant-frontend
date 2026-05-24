import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepProgressIndicator } from '../../components/navigation/StepProgressIndicator';
import { SelectDropdown } from '../../components/ui/SelectDropdown';
import { Button } from '../../components/ui/Button';

export const FaithProfileScreen = () => {
  const navigate = useNavigate();
  const [denomination, setDenomination] = useState('');
  const [church_attendance, setChurchAttendance] = useState('');
  const [prayer_frequency, setPrayerFrequency] = useState('');
  const [bible_reading, setBibleReading] = useState('');

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

        {/* 2. Form Inputs (Reusable Dropdowns!) */}
        <div className="w-full space-y-5 mb-8">
          <SelectDropdown 
            label="Denomination"
            placeholder="Select denomination"
            value={denomination}
            onChange={(e) => setDenomination(e.target.value)}
            options={[
              { value: 'catholic', label: 'Catholic' },
              { value: 'protestant', label: 'Protestant' },
              { value: 'orthodox', label: 'Orthodox' },
              { value: 'non_denominational', label: 'Non-Denominational' },
              { value: 'other', label: 'Other' }
            ]}
          />

          <SelectDropdown 
            label="How often do you attend church?"
            placeholder="Select"
            value={church_attendance}
            onChange={(e) => setChurchAttendance(e.target.value)}
            options={[
              { value: 'multiple', label: 'Multiple times a week' },
              { value: 'weekly', label: 'Weekly' },
              { value: 'monthly', label: 'Monthly' },
              { value: 'rarely', label: 'Rarely' }
            ]}
          />

          <SelectDropdown 
            label="How often do you pray?"
            placeholder="Select"
            value={prayer_frequency}
            onChange={(e) => setPrayerFrequency(e.target.value)}
            options={[
              { value: 'multiple_daily', label: 'Multiple times a day' },
              { value: 'daily', label: 'Daily' },
              { value: 'weekly', label: 'Weekly' },
              { value: 'rarely', label: 'Rarely' }
            ]}
          />

          <SelectDropdown 
            label="How often do you read the Bible?"
            placeholder="Select"
            value={bible_reading}
            onChange={(e) => setBibleReading(e.target.value)}
            options={[
              { value: 'multiple_daily', label: 'Multiple times a day' },
              { value: 'daily', label: 'Daily' },
              { value: 'weekly', label: 'Weekly' },
              { value: 'rarely', label: 'Rarely' }
            ]}
          />
        </div>

        {/* 3. Reusable Footer Section */}
        <div className="mt-auto pt-10 pb-4 w-full flex flex-col items-center gap-5">
          <Button variant="primary" onClick={() => {
            navigate('/intentions', {
              state: { denomination, church_attendance, prayer_frequency, bible_reading }
            });
          }}>
            Continue
          </Button>
          
          <button onClick={() => navigate('/intentions')} className="text-[15px] font-medium text-gray-500 hover:text-gray-700 transition-colors">
            Skip for now
          </button>
        </div>

      </div>
    </div>
  );
};
