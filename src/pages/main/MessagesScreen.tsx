import { BottomNavBar } from '../../components/navigation/BottomNavBar';
import { ChatList } from '../../components/ui/ChatList';
import { MessageCircle } from 'lucide-react';

export const MessagesScreen = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f7f5f0] w-full max-w-sm md:max-w-full mx-auto relative overflow-hidden">
      
      {/* Left Pane (Mobile: Full width, Desktop: Sidebar width) */}
      <div className="w-full md:w-[350px] lg:w-[400px] h-screen border-r border-gray-200 shrink-0 flex flex-col relative">
        <ChatList />
        {/* Bottom Nav Bar (Hidden on desktop via its own internal class) */}
        <BottomNavBar />
      </div>

      {/* Right Pane (Desktop Only Placeholder) */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-gray-50 h-screen">
        <MessageCircle size={64} className="text-gray-300 mb-6" strokeWidth={1} />
        <h2 className="text-xl font-bold text-gray-400 mb-2">Your Messages</h2>
        <p className="text-gray-500 font-medium">Select a conversation to start chatting.</p>
      </div>

    </div>
  );
};
