import { useState } from 'react';
import axios from 'axios';
import { Button } from './Button';

interface DailyScenarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnswerSubmitted?: () => void;
}

const DAILY_SCENARIO_PROMPT = {
  id: 'q_accountability_2',
  pillar: 'Moral Anchor & Boundaries',
  question: 'If you found yourself in a confusing or compromising situation by mistake, what is your immediate natural reaction?',
  options: [
    { id: 'opt_a', text: 'Tell my partner right away, even if it causes temporary hurt or awkwardness.', badge: '💎 Uncompromising Honesty' },
    { id: 'opt_b', text: 'Handle it privately, cut off the situation, and only share if necessary.', badge: '🔒 Private Resolution' },
    { id: 'opt_c', text: 'Speak to a pastor/mentor first to understand the situation before addressing it.', badge: '📜 Wise Counsel Seeking' },
  ]
};

export const DailyScenarioModal = ({ isOpen, onClose, onAnswerSubmitted }: DailyScenarioModalProps) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!selectedOption) return;

    setIsSubmitting(true);
    const token = localStorage.getItem('token');
    try {
      if (token) {
        await axios.post(
          '/api/v1/users/scenarios/answer',
          { question_id: DAILY_SCENARIO_PROMPT.id, option_id: selectedOption },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsSubmitting(false);
        if (onAnswerSubmitted) onAnswerSubmitted();
        onClose();
      }, 1400);
    } catch (e) {
      console.warn('Failed to submit daily scenario answer:', e);
      setIsSubmitting(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in">
      <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-gray-100 flex flex-col relative overflow-hidden">
        
        {/* Top Decorative Sparkle Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-bold tracking-wider text-amber-800 bg-amber-100/90 px-3 py-1 rounded-full uppercase">
            🌟 Daily Covenant Scenario (+5% Accuracy)
          </span>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-lg font-bold">
            ✕
          </button>
        </div>

        {isSuccess ? (
          <div className="py-10 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-2xl">
              ✓
            </div>
            <h3 className="text-lg font-bold text-gray-900">Profile Match Score Updated!</h3>
            <p className="text-sm text-gray-500">Your candidates stack has been refreshed with refined compatibility.</p>
          </div>
        ) : (
          <>
            <h2 className="text-[17px] font-bold text-gray-900 mb-2 leading-snug">
              Today's Heart Posture Prompt
            </h2>
            <p className="text-[13px] text-gray-600 mb-5 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100 italic">
              "{DAILY_SCENARIO_PROMPT.question}"
            </p>

            <div className="space-y-2.5 mb-6">
              {DAILY_SCENARIO_PROMPT.options.map((option) => {
                const isSelected = selectedOption === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedOption(option.id)}
                    className={`w-full text-left p-3.5 rounded-xl border text-[13px] transition-all flex flex-col gap-1 ${
                      isSelected
                        ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-500/20'
                        : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded w-max">
                      {option.badge}
                    </span>
                    <span className={`leading-snug ${isSelected ? 'text-gray-900 font-semibold' : 'text-gray-700'}`}>
                      {option.text}
                    </span>
                  </button>
                );
              })}
            </div>

            <Button
              variant="primary"
              disabled={!selectedOption || isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? 'Saving...' : 'Submit & Refine Matches'}
            </Button>
          </>
        )}

      </div>
    </div>
  );
};
