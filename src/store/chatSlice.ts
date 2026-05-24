import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Message } from '../types';

interface ChatState {
  // Map of MatchID to an array of Messages
  messagesByMatch: Record<string, Message[]>;
}

const initialState: ChatState = {
  messagesByMatch: {},
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
    },
    // Triggered to populate historical chat history
    setChatHistory: (state, action: PayloadAction<{ matchId: string; messages: Message[] }>) => {
      state.messagesByMatch[action.payload.matchId] = action.payload.messages;
    }
  },
});

export const { receiveMessage, setChatHistory } = chatSlice.actions;
export default chatSlice.reducer;
