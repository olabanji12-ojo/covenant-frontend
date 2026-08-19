import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { StepProgressIndicator } from '../../components/navigation/StepProgressIndicator';
import { Button } from '../../components/ui/Button';
import apiClient from '../../api/client';

const ONBOARDING_SCENARIOS = [
  {
    id: 'q_boundaries_1',
    pillar: 'Moral Anchor & Boundaries',
    question: 'A close colleague of the opposite sex invites you for a late-night private drink to discuss a bad day. How do you handle this?',
    options: [
      { id: 'opt_a', text: 'Decline or suggest coffee during office hours—late-night private drinks cross a personal boundary.', badge: '🛡️ Proactive Boundaries' },
      { id: 'opt_b', text: 'Accept, but inform my partner immediately so everything is transparent.', badge: '👁️ Open Transparency' },
      { id: 'opt_c', text: 'Go and focus on work—trust means not worrying about strict rules.', badge: '🤝 High Trust Flexibility' },
    ]
  },
  {
    id: 'q_conflict_1',
    pillar: 'Conflict & Grace',
    question: 'When you and your partner have a heated disagreement before a social event, what is your instinct?',
    options: [
      { id: 'opt_a', text: 'Pause and address it calmly right away, even if it makes us late.', badge: '🕊️ Immediate Resolution' },
      { id: 'opt_b', text: 'Put it on hold gracefully, enjoy the event, and discuss it in private later.', badge: '⏳ Grateful Delay' },
      { id: 'opt_c', text: 'Take space alone first to process thoughts before speaking.', badge: '💭 Thoughtful Space' },
    ]
  },
  {
    id: 'q_stewardship_1',
    pillar: 'Stewardship & Finances',
    question: 'When an unexpected financial bonus or blessing comes in, what is your immediate priority?',
    options: [
      { id: 'opt_a', text: 'Save or invest the majority to build long-term family security.', badge: '⚖️ Future Security' },
      { id: 'opt_b', text: 'Set aside a portion for giving/tithing, and invest/save the rest.', badge: '🌱 Kingdom Stewardship' },
      { id: 'opt_c', text: 'Use a portion for a shared experience or personal goal, then save the remainder.', badge: '🎉 Balanced Joy' },
    ]
  },
  {
    id: 'q_pacing_1',
    pillar: 'Pacing & Intentionality',
    question: 'In the first 3 to 6 months of dating, what matters most to you in determining if this person is "The One"?',
    options: [
      { id: 'opt_a', text: 'Observing how they handle stress, conflict, and treat service workers/family.', badge: '🔍 Character Observer' },
      { id: 'opt_b', text: 'Experiencing deep, unfiltered conversations about faith, vision, and future goals.', badge: '📖 Vision Alignment' },
      { id: 'opt_c', text: 'Seeing how well our daily rhythms, laughter, and companionship naturally flow together.', badge: '☀️ Natural Harmony' },
    ]
  }
];

export const CovenantAssessmentScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const previousState = location.state || {};

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = ONBOARDING_SCENARIOS[currentIndex];

  const handleNext = async () => {
    if (!selectedOption) return;

    const newAnswers = { ...answers, [currentQuestion.id]: selectedOption };
    setAnswers(newAnswers);

    // Save answer to backend
    try {
      await apiClient.post('/users/scenarios/answer', {
        question_id: currentQuestion.id,
        option_id: selectedOption,
      });
    } catch (e) {
      console.warn('Could not sync scenario answer asynchronously:', e);
    }

    if (currentIndex < ONBOARDING_SCENARIOS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption('');
    } else {
      setIsSubmitting(true);
      navigate('/intentions', {
        state: { ...previousState, scenario_answers: newAnswers }
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0] flex flex-col items-center py-8 px-5">
      <div className="w-full max-w-sm flex flex-col flex-1 min-h-[calc(100vh-4rem)]">
        
        {/* Step Progress Bar */}
        <div className="w-full flex justify-center mb-6 mt-2">
          <StepProgressIndicator totalSteps={4} currentStep={currentIndex + 1} />
        </div>

        {/* Header Badge & Title */}
        <div className="flex flex-col items-center mb-6">
          <span className="text-[12px] font-semibold tracking-wider text-amber-700 uppercase bg-amber-100 px-3 py-1 rounded-full mb-2">
            Pillar {currentIndex + 1} of 4: {currentQuestion.pillar}
          </span>
          <h1 className="text-[22px] font-bold text-gray-900 mb-2 text-center leading-snug">
            Covenant Heart Alignment
          </h1>
          <p className="text-[14px] text-gray-500 text-center px-2 leading-relaxed">
            Select the choice that best reflects your natural reaction.
          </p>
        </div>

        {/* Scenario Card Container */}
        <div className="w-full bg-white p-5 rounded-2xl shadow-sm border border-gray-200/80 mb-6">
          <p className="text-[15px] font-semibold text-gray-800 mb-5 leading-snug">
            "{currentQuestion.question}"
          </p>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedOption === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedOption(option.id)}
                  className={`w-full text-left p-4 rounded-xl border text-[14px] transition-all flex flex-col gap-1.5 ${
                    isSelected
                      ? 'border-amber-600 bg-amber-50/60 ring-2 ring-amber-500/20 shadow-sm'
                      : 'border-gray-200 bg-gray-50/50 hover:bg-gray-100/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded">
                      {option.badge}
                    </span>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-amber-600 bg-amber-600' : 'border-gray-300'
                    }`}>
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                  <p className={`leading-snug ${isSelected ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                    {option.text}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-auto pt-4 pb-4 w-full flex flex-col items-center gap-3">
          <Button
            variant="primary"
            disabled={!selectedOption || isSubmitting}
            onClick={handleNext}
          >
            {currentIndex < ONBOARDING_SCENARIOS.length - 1 ? 'Continue' : 'Complete Covenant Assessment'}
          </Button>

          <button
            onClick={() => navigate('/intentions', { state: previousState })}
            className="text-[14px] font-medium text-gray-400 hover:text-gray-600 transition-colors"
          >
            Skip for now
          </button>
        </div>

      </div>
    </div>
  );
};
