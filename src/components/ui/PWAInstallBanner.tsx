import React from 'react';
import { Download, X } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

export const PWAInstallBanner = () => {
  const { isInstallable, triggerInstall } = usePWAInstall();
  const [dismissed, setDismissed] = React.useState(false);

  // Only show if the app is installable and the user hasn't dismissed it this session
  if (!isInstallable || dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 z-50 animate-slide-up">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
            <img src="/Cross.png" alt="Logo" className="w-6 h-6 object-contain" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">Add to Home Screen</h4>
            <p className="text-xs text-gray-500">Install Church Match for a better, faster experience.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={triggerInstall}
            className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors flex items-center gap-1 shadow-sm"
          >
            <Download size={14} />
            Install
          </button>
          <button 
            onClick={() => setDismissed(true)}
            className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
