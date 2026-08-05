import React, { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDestructive = true,
  onConfirm,
  onCancel,
}) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Glassmorphic Backdrop */}
      <div 
        className="absolute inset-0 bg-[#1f3d28]/35 backdrop-blur-md transition-opacity duration-300"
        onClick={onCancel}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-sm bg-white/90 backdrop-blur-lg border border-white/20 rounded-[28px] shadow-2xl p-6 flex flex-col items-center text-center transform scale-100 transition-all duration-300 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
        >
          <X size={18} strokeWidth={2} />
        </button>

        {/* Warning Icon Container */}
        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${
          isDestructive ? 'bg-red-50 text-red-500' : 'bg-green-50 text-primary'
        }`}>
          <AlertTriangle size={28} strokeWidth={2} />
        </div>

        {/* Title */}
        <h3 className="text-[18px] font-bold text-gray-900 mb-2 px-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-[14px] text-gray-500 leading-relaxed font-medium mb-6 px-2">
          {message}
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-2.5 w-full">
          <button
            onClick={onConfirm}
            className={`w-full font-bold text-[15px] py-4 rounded-full shadow-sm transition-all duration-200 active:scale-[0.98] ${
              isDestructive 
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-200' 
                : 'bg-primary hover:bg-[#122418] text-white shadow-green-200'
            }`}
          >
            {confirmText}
          </button>
          
          <button
            onClick={onCancel}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-[15px] py-4 rounded-full transition-all duration-200 active:scale-[0.98]"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};
