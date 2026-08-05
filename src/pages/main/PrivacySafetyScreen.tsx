import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ShieldAlert, FileText, Ban, Info, X } from 'lucide-react';

export const PrivacySafetyScreen = () => {
  const navigate = useNavigate();
  const [blockedUsers] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f5f0] w-full max-w-sm md:max-w-2xl mx-auto relative overflow-hidden md:pb-6 md:bg-white md:shadow-sm md:border-x border-gray-100">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-10 pb-6 bg-[#f7f5f0] md:bg-white z-10 sticky top-0 border-b border-gray-200">
        <button onClick={() => navigate(-1)} className="text-gray-900 hover:opacity-70 transition-opacity -ml-1">
          <ChevronLeft size={24} strokeWidth={1.5} />
        </button>
        <h1 className="text-[20px] font-bold text-[#1a3322]">Privacy & Safety</h1>
        <div className="w-6" /> {/* Spacer */}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar px-6 pb-28 pt-6">
        
        {/* Intro */}
        <div className="flex flex-col items-center justify-center mb-8 bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
          <div className="w-14 h-14 bg-[#fdf4d2] rounded-full flex items-center justify-center mb-4">
            <ShieldAlert className="text-[#d6b754]" size={28} />
          </div>
          <h2 className="text-[18px] font-bold text-gray-900 mb-2">Your Safety Matters</h2>
          <p className="text-[13px] text-gray-500 text-center font-medium leading-relaxed">
            We are committed to keeping Church Match a safe, respectful, and God-honoring community.
          </p>
        </div>

        {/* Links */}
        <div className="space-y-3 mb-8">
          <button onClick={() => setIsModalOpen(true)} className="w-full flex items-center justify-between p-5 bg-white rounded-[16px] shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <FileText size={20} className="text-blue-500" />
              </div>
              <div>
                <span className="block text-[15px] font-bold text-gray-900">Community Guidelines</span>
                <span className="block text-[12px] text-gray-500 font-medium">Read our rules of engagement</span>
              </div>
            </div>
            <ChevronLeft className="rotate-180 text-gray-400" size={20} />
          </button>

          <button onClick={() => setIsModalOpen(true)} className="w-full flex items-center justify-between p-5 bg-white rounded-[16px] shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                <ShieldAlert size={20} className="text-green-500" />
              </div>
              <div>
                <span className="block text-[15px] font-bold text-gray-900">Safety Tips</span>
                <span className="block text-[12px] text-gray-500 font-medium">How to date safely online</span>
              </div>
            </div>
            <ChevronLeft className="rotate-180 text-gray-400" size={20} />
          </button>
        </div>

        {/* Blocked Users Section */}
        <div>
          <h3 className="text-[16px] font-bold text-gray-900 mb-4 px-1">Blocked Profiles</h3>
          
          {blockedUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 px-6 bg-white rounded-[16px] border border-gray-100 border-dashed">
              <Ban className="text-gray-300 mb-3" size={32} />
              <p className="text-[14px] text-gray-500 font-medium text-center">
                You haven't blocked anyone yet.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {blockedUsers.map((user, i) => (
                <div key={i} className="flex items-center justify-between bg-white p-4 rounded-[16px] border border-gray-100">
                  <span className="text-[14px] font-bold text-gray-900">{user.name}</span>
                  <button className="text-[12px] font-bold text-gray-500 hover:text-gray-900 bg-gray-100 px-4 py-2 rounded-full transition-colors">
                    Unblock
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Coming Soon Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white w-full max-w-sm rounded-[24px] p-6 shadow-2xl relative overflow-hidden flex flex-col">
            
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center mt-2">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Info size={32} className="text-blue-500" />
              </div>
              <h3 className="text-[20px] font-bold text-gray-900 mb-2">Coming Soon</h3>
              <p className="text-[14px] text-gray-500 leading-relaxed font-medium mb-6">
                We are currently finalizing our official guidelines and safety materials. You'll be notified via the app as soon as there is an update!
              </p>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-[#1a3322] text-white font-bold py-3.5 rounded-full text-[15px] hover:bg-[#122418] transition-colors"
              >
                Got it
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
