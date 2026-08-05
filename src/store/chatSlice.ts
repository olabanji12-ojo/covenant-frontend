import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Message } from '../types';

interface ChatState {
  // Map of MatchID to an array of Messages
  messagesByMatch: Record<string, Message[]>;
  unreadCount: number;
}

const initialState: ChatState = {
  messagesByMatch: {},
  unreadCount: 0,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // Triggered when the WebSocket receives a message
    receiveMessage: (state, action: PayloadAction<Message>) => {
      const msg = action.payload;
      if (!state.messagesByMatch[msg.match_id]) {
        state.messagesByMatch[msg.match_id] = [];
      }
      state.messagesByMatch[msg.match_id].push(msg);
      state.unreadCount += 1;
    },
    // Triggered to populate historical chat history
    setChatHistory: (state, action: PayloadAction<{ matchId: string; messages: Message[] }>) => {
      state.messagesByMatch[action.payload.matchId] = action.payload.messages;
    },
    // Reset unread count when user views chat inbox
    clearUnread: (state) => {
      state.unreadCount = 0;
    }
  },
});

export const { receiveMessage, setChatHistory, clearUnread } = chatSlice.actions;
export default chatSlice.reducer;
