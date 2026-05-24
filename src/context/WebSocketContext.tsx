import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { receiveMessage } from '../store/chatSlice';
import type { Message } from '../types';

interface WebSocketContextType {
  sendMessage: (matchId: string, content: string, type?: 'text' | 'prayer') => void;
  isConnected: boolean;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = React.useState(false);

  useEffect(() => {
    // Only connect if the user is logged in and we have a token
    if (!isAuthenticated || !token) {
      if (socketRef.current) {
        socketRef.current.close();
      }
      return;
    }

    // Use the dynamic WS URL from Vercel config, or fallback to localhost
    const wsUrl = import.meta.env.VITE_WS_URL 
      ? `${import.meta.env.VITE_WS_URL}?auth_token=${token}`
      : `ws://localhost:8081/ws/v1/chat?auth_token=${token}`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('WebSocket Connected to Go Backend');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const message: Message = JSON.parse(event.data);
        // Instantly push the new message to Redux State!
        dispatch(receiveMessage(message));
      } catch (error) {
        console.error('Error parsing websocket message:', error);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket Disconnected');
      setIsConnected(false);
    };

    socketRef.current = ws;

    return () => {
      ws.close();
    };
  }, [isAuthenticated, token, dispatch]);

  const sendMessage = (matchId: string, content: string, type: 'text' | 'prayer' = 'text') => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const payload = {
        match_id: matchId,
        content: content,
        type: type,
      };
      socketRef.current.send(JSON.stringify(payload));
    } else {
      console.error('Cannot send message: WebSocket is not open.');
    }
  };

  return (
    <WebSocketContext.Provider value={{ sendMessage, isConnected }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
