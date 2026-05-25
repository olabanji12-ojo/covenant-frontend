import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useWebSocket } from '../../context/WebSocketContext';
import type { RootState } from '../../store';
import { setChatHistory } from '../../store/chatSlice';
import { apiSlice } from '../../store/apiSlice';
import apiClient from '../../api/client';
import type { Message } from '../../types';
import { ChevronLeft, Phone, MoreHorizontal, CheckCheck, SendHorizontal } from 'lucide-react';
import { ConfirmModal } from '../../components/ui/ConfirmModal';

// ==========================================
// REUSABLE COMPONENT: MessageBubble
// Handles both incoming and outgoing messages!
// ==========================================
interface MessageBubbleProps {
  text: string;
  time: string;
  isOutgoing: boolean;
  avatarUrl?: string;
  type?: 'text' | 'prayer';
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ text, time, isOutgoing, avatarUrl, type }) => {
  // SPECIAL PRAYER CARD DESIGN!
  if (type === 'prayer') {
    return (
      <div className={`flex w-full ${isOutgoing ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`flex flex-col max-w-[85%] rounded-[20px] p-4 relative overflow-hidden shadow-sm
          ${isOutgoing ? 'bg-gradient-to-br from-[#1a3322] to-[#2a5332] text-white rounded-tr-sm' : 'bg-white border border-[#e5ede7] text-gray-900 rounded-tl-sm'}
        `}>
          {/* Soft glowing border effect */}
          <div className="absolute inset-0 border-2 border-[#d6b754]/30 rounded-[20px] pointer-events-none" />
          
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[18px]">🙏</span>
            <span className={`text-[11px] font-bold uppercase tracking-wider ${isOutgoing ? 'text-[#e7cf7b]' : 'text-[#489954]'}`}>
              Shared Prayer
            </span>
          </div>
          
          <p className="text-[14.5px] font-medium leading-relaxed italic opacity-95">
            "{text}"
          </p>
          
          <div className={`flex items-center gap-1 self-end mt-2 ${isOutgoing ? 'text-white/70' : 'text-gray-400'}`}>
            <span className="text-[9px] font-bold">{time}</span>
            {isOutgoing && <CheckCheck size={14} strokeWidth={2.5} />}
          </div>
        </div>
      </div>
    );
  }

  // STANDARD CHAT BUBBLE
  return (
    <div className={`flex w-full ${isOutgoing ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex gap-3 max-w-[85%] ${isOutgoing ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        {!isOutgoing && avatarUrl && (
          <img 
            src={avatarUrl} 
            alt="Avatar" 
            className="w-[34px] h-[34px] rounded-full object-cover shrink-0 mt-0.5"
          />
        )}

        {/* The Bubble */}
        <div 
          className={`relative px-4 py-3 text-[14px] font-medium leading-snug flex flex-col gap-1 shadow-sm
            ${isOutgoing 
              ? 'bg-[#eff3ea] rounded-2xl rounded-tr-sm text-gray-900' 
              : 'bg-[#ebebeb] rounded-2xl rounded-tl-sm text-gray-900'
            }
          `}
        >
          <span>{text}</span>
          
          {/* Metadata */}
          <div className={`flex items-center gap-1 self-end mt-1 opacity-50`}>
            <span className="text-[9px] font-bold">{time}</span>
            {isOutgoing && <CheckCheck size={14} strokeWidth={2.5} />}
          </div>
        </div>

      </div>
    </div>
  );
};

export const ActiveChatScreen = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [inputText, setInputText] = useState('');
  const [isUnmatchOpen, setIsUnmatchOpen] = useState(false);
  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);
  const [prayerText, setPrayerText] = useState('');
  
  // Try to get matchUser from navigation state
  const matchUser = location.state?.matchUser;
  
  // Determine dynamic UI elements
  const matchName = matchUser ? (matchUser.first_name || matchUser.name || 'Match').split(' ')[0] : 'Match';
  const matchAvatar = matchUser?.photos?.[0] || '/female1.jpg';
  
  // Real-time hooks!
  const { sendMessage } = useWebSocket();
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  
  // Grab ONLY the messages for this specific match ID
  const allMessages = useSelector((state: RootState) => state.chat.messagesByMatch);
  const matchMessages = matchId && allMessages[matchId] ? allMessages[matchId] : [];

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch historical messages on mount
  useEffect(() => {
    const fetchHistory = async () => {
      if (!matchId) return;
      try {
        const res = await apiClient.get<{ data: Message[] }>(`/chat/${matchId}/messages`);
        if (res.data.data) {
          dispatch(setChatHistory({ matchId, messages: res.data.data }));
        }
      } catch (err) {
        console.error('Failed to fetch message history:', err);
      }
    };
    
    // Only fetch if we don't already have messages loaded in Redux for this match
    if (matchMessages.length === 0) {
      fetchHistory();
    }
  }, [matchId, dispatch, matchMessages.length]);

  // Auto-scroll to the bottom whenever a new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [matchMessages]);

  const handleSend = () => {
    if (!inputText.trim() || !matchId) return;
    sendMessage(matchId, inputText.trim(), 'text');
    setInputText('');
  };

  const handleSendPrayer = () => {
    if (!prayerText.trim() || !matchId) return;
    sendMessage(matchId, prayerText.trim(), 'prayer');
    setPrayerText('');
    setIsPrayerModalOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleUnmatchConfirm = async () => {
    if (!matchId) return;
    try {
      await apiClient.delete(`/matches/${matchId}`);
      // Force the RTK query cache for matches to invalidate so it disappears from the inbox
      dispatch(apiSlice.util.invalidateTags(['Match']));
    } catch (err) {
      console.error('Failed to unmatch:', err);
    } finally {
      setIsUnmatchOpen(false);
      navigate('/app/chat'); // Go back to the messages inbox
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#f7f5f0] w-full max-w-sm mx-auto relative overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-10 pb-4 bg-[#f7f5f0] z-10 shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-900 hover:opacity-70 transition-opacity">
            <ChevronLeft size={28} strokeWidth={1.5} />
          </button>
          
          <div className="flex items-center gap-3">
            <img src={matchAvatar} alt={matchName} className="w-[38px] h-[38px] rounded-full object-cover" />
            <div className="flex flex-col">
              <span className="font-bold text-[15px] leading-none mb-1 text-gray-900">{matchName}</span>
              <span className="text-[11px] font-bold text-[#489954] leading-none">Online now</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-gray-900">
          <button className="hover:opacity-70 transition-opacity">
            <Phone size={22} strokeWidth={1.5} />
          </button>
          <button 
            onClick={() => setIsUnmatchOpen(true)}
            className="hover:opacity-70 transition-opacity"
          >
            <MoreHorizontal size={24} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Chat Messages Area (Scrollable!) */}
      <div className="flex-1 px-4 py-6 overflow-y-auto flex flex-col">
        {matchMessages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm italic">
            Say hello to your new match! 👋
          </div>
        ) : (
          matchMessages.map((msg, index) => (
            <MessageBubble 
              key={msg.id || index}
              text={msg.content}
              // Format ISO string to a simple time (e.g., 10:20am)
              time={new Date(msg.created_at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              isOutgoing={msg.sender_id === user?.id}
              avatarUrl={matchAvatar}
              type={msg.type}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Input Area */}
      <div className="bg-[#f7f5f0] pt-2 pb-8 px-5 flex flex-col gap-6 shrink-0">
        
        {/* Input Box */}
        <div className="relative w-full">
          <input 
            type="text" 
            placeholder="Type a message......."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-[#f4f4f4] border border-gray-300 rounded-full py-[14px] pl-6 pr-12 text-[13px] text-gray-900 outline-none focus:border-[#489954] transition-colors placeholder:text-gray-400 font-medium shadow-sm"
          />
          {/* Send Button instead of Smiley for actual functionality */}
          <button 
            onClick={handleSend}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-primary hover:scale-110 transition-transform"
          >
            <SendHorizontal size={22} strokeWidth={2} />
          </button>
        </div>

        {/* Action Features */}
        <div className="flex justify-between items-center px-4">
          
          <button onClick={() => navigate('/app/share-scripture')} className="flex flex-col items-center gap-1.5 hover:opacity-80 transition-opacity">
            <div className="text-[24px] leading-none">📖</div>
            <span className="text-[11px] font-bold text-[#489954]">Share verse</span>
          </button>

          <button onClick={() => setIsPrayerModalOpen(true)} className="flex flex-col items-center gap-1.5 hover:opacity-80 transition-opacity">
            <div className="text-[24px] leading-none">🙏🏼</div>
            <span className="text-[11px] font-bold text-gray-500">Pray together</span>
          </button>

          <button className="flex flex-col items-center gap-1.5 hover:opacity-80 transition-opacity">
            {/* Custom SVG/CSS build for the yellow question mark circle! */}
            <div className="w-[28px] h-[28px] rounded-full bg-[#fdf4d2] flex items-center justify-center border-[1.5px] border-[#e7cf7b] shadow-sm">
              <span className="text-[#d6b754] font-bold text-[14px] leading-none">?</span>
            </div>
            <span className="text-[11px] font-bold text-gray-500">Ask a Question</span>
          </button>

        </div>
      </div>

      {/* Confirm Unmatch Modal */}
      <ConfirmModal
        isOpen={isUnmatchOpen}
        title={`Unmatch with ${matchName}?`}
        message={`Are you sure you want to unmatch? You won't be able to message ${matchName} anymore and this action cannot be undone.`}
        confirmText="Yes, Unmatch"
        cancelText="Cancel"
        isDestructive={true}
        onConfirm={handleUnmatchConfirm}
        onCancel={() => setIsUnmatchOpen(false)}
      />

      {/* Pray Together Modal */}
      {isPrayerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-[#fdfaf5] w-full max-w-sm rounded-[32px] p-6 shadow-xl relative border-2 border-[#d6b754]/30 overflow-hidden">
            {/* Glow effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#e7cf7b]/20 blur-2xl rounded-full" />
            
            <div className="relative">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-[22px] font-bold text-gray-900 leading-tight">Pray Together</h3>
                  <p className="text-[13px] text-gray-500 mt-1">Write a prayer for {matchName}...</p>
                </div>
                <div className="w-12 h-12 bg-[#fdf4d2] rounded-full flex items-center justify-center border border-[#e7cf7b]">
                  <span className="text-[24px]">🙏</span>
                </div>
              </div>
              
              <textarea
                value={prayerText}
                onChange={(e) => setPrayerText(e.target.value)}
                placeholder="Dear Lord, I pray that..."
                className="w-full h-32 bg-white border border-gray-200 rounded-[16px] p-4 text-[14px] text-gray-900 focus:outline-none focus:border-[#d6b754] focus:ring-2 focus:ring-[#d6b754]/20 transition-all resize-none mb-6 shadow-sm placeholder:text-gray-400"
              />
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsPrayerModalOpen(false)}
                  className="flex-1 py-3.5 rounded-full font-bold text-[14px] text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSendPrayer}
                  disabled={!prayerText.trim()}
                  className="flex-1 py-3.5 rounded-full font-bold text-[14px] text-[#1a3322] bg-[#fdf4d2] border border-[#e7cf7b] hover:bg-[#fae79b] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  Send Prayer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
