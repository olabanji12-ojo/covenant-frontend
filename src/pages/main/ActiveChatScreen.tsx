import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { ChevronLeft, Phone, MoreHorizontal, CheckCheck } from 'lucide-react';

// ==========================================
// REUSABLE COMPONENT: MessageBubble
// Handles both incoming and outgoing messages!
// ==========================================
interface MessageBubbleProps {
  text: string;
  time: string;
  isOutgoing: boolean;
  avatarUrl?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ text, time, isOutgoing, avatarUrl }) => {
  return (
    <div className={`flex w-full ${isOutgoing ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex gap-3 max-w-[85%] ${isOutgoing ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar (Only for incoming messages from Mary!) */}
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
          
          {/* Metadata: Time and Read Receipt */}
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
  const [inputText, setInputText] = useState('');
  const navigate = useNavigate();

  // Dummy Messages from your Figma Screenshot
  const messages = [
    { text: "Hi! I loved your answer about faith journey", time: "10:20am", isOutgoing: false },
    { text: "Thank you! I loved yours too. Where do you go to church?", time: "10:22am", isOutgoing: true },
    { text: "I go to Grace Community church. How about you?", time: "10:25am", isOutgoing: false },
    { text: "That's awesome! I go to Holiness Church.", time: "10:30am", isOutgoing: true },
    { text: "Oh, that's really good of you.", time: "10:35am", isOutgoing: false },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#f7f5f0] w-full max-w-sm mx-auto relative overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-10 pb-4 bg-[#f7f5f0] z-10 shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-900 hover:opacity-70 transition-opacity">
            <ChevronLeft size={28} strokeWidth={1.5} />
          </button>
          
          <div className="flex items-center gap-3">
            <img src="/female1.jpg" alt="Mary" className="w-[38px] h-[38px] rounded-full object-cover" />
            <div className="flex flex-col">
              <span className="font-bold text-[15px] leading-none mb-1 text-gray-900">Mary</span>
              <span className="text-[11px] font-bold text-[#489954] leading-none">Online now</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-gray-900">
          <button className="hover:opacity-70 transition-opacity">
            <Phone size={22} strokeWidth={1.5} />
          </button>
          <button className="hover:opacity-70 transition-opacity">
            <MoreHorizontal size={24} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Chat Messages Area (Scrollable!) */}
      <div className="flex-1 px-4 py-6 overflow-y-auto flex flex-col">
        {messages.map((msg, index) => (
          <MessageBubble 
            key={index}
            text={msg.text}
            time={msg.time}
            isOutgoing={msg.isOutgoing}
            avatarUrl="/female1.jpg"
          />
        ))}
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
            className="w-full bg-[#f4f4f4] border border-gray-300 rounded-full py-[14px] pl-6 pr-12 text-[13px] text-gray-900 outline-none focus:border-[#489954] transition-colors placeholder:text-gray-400 font-medium shadow-sm"
          />
          {/* Smiley Icon */}
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[20px] hover:scale-110 transition-transform">
            🙂
          </button>
        </div>

        {/* Action Features */}
        <div className="flex justify-between items-center px-4">
          
          <button onClick={() => navigate('/app/share-scripture')} className="flex flex-col items-center gap-1.5 hover:opacity-80 transition-opacity">
            <div className="text-[24px] leading-none">📖</div>
            <span className="text-[11px] font-bold text-[#489954]">Share verse</span>
          </button>

          <button className="flex flex-col items-center gap-1.5 hover:opacity-80 transition-opacity">
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

    </div>
  );
};
