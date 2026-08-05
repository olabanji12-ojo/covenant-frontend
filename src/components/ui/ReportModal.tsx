import React, { useState } from 'react';
import { ShieldAlert, X, Loader2 } from 'lucide-react';
import apiClient from '../../api/client';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportedUserId: string;
  reportedUserName: string;
  onSuccess: () => void;
}

const REPORT_REASONS = [
  "Inappropriate messages or photos",
  "Spam or scam profile",
  "Feels like a fake profile",
  "Harassment or bullying",
  "Offensive bio or details",
  "Other"
];

export const ReportModal: React.FC<ReportModalProps> = ({ 
  isOpen, 
  onClose, 
  reportedUserId, 
  reportedUserName,
  onSuccess
}) => {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!selectedReason || !reportedUserId) return;
    
    setIsSubmitting(true);
    try {
      await apiClient.post(`/users/${reportedUserId}/report`, {
        reason: selectedReason
      });
      onSuccess();
    } catch (error) {
      console.error('Failed to submit report', error);
      alert('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
      setSelectedReason('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white w-full max-w-sm rounded-[24px] p-6 shadow-2xl relative overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
              <ShieldAlert className="text-red-500" size={20} strokeWidth={2} />
            </div>
            <h2 className="text-[18px] font-bold text-gray-900 leading-tight">Report User</h2>
          </div>
          <button onClick={onClose} className="p-2 -mr-2 text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pb-2">
          <p className="text-[14px] text-gray-600 mb-5 leading-relaxed font-medium">
            Why are you reporting <span className="font-bold text-gray-900">{reportedUserName}</span>? 
            This action is anonymous and they will not be notified. We will automatically block them for you.
          </p>

          <div className="space-y-3">
            {REPORT_REASONS.map((reason) => (
              <label 
                key={reason}
                onClick={() => setSelectedReason(reason)}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-colors ${
                  selectedReason === reason 
                    ? 'border-red-500 bg-red-50/50' 
                    : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  selectedReason === reason ? 'border-red-500' : 'border-gray-300'
                }`}>
                  {selectedReason === reason && <div className="w-2.5 h-2.5 rounded-full bg-red-500" />}
                </div>
                <span className={`text-[14.5px] font-medium ${selectedReason === reason ? 'text-red-700' : 'text-gray-700'}`}>
                  {reason}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 shrink-0 mt-auto bg-white border-t border-gray-100">
          <button
            onClick={handleSubmit}
            disabled={!selectedReason || isSubmitting}
            className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-4 rounded-full text-[15px] transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting && <Loader2 size={18} className="animate-spin" />}
            {isSubmitting ? 'Submitting...' : 'Submit Report & Block'}
          </button>
        </div>

      </div>
    </div>
  );
};
