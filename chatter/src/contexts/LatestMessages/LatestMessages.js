import React, { useState, createContext, useCallback, useEffect } from 'react';
import io from 'socket.io-client';
import config from '../../config';
import initialMessages from './constants/initialMessages';

const LatestMessagesContext = createContext({});

export default LatestMessagesContext;

const socket = io(
  config.BOT_SERVER_ENDPOINT,
  { transports: ['websocket', 'polling', 'flashsocket'] }
);

export function LatestMessages({ children }) {

  const [messages, setMessages] = useState(initialMessages);

  const setLatestMessage = useCallback((userId, value) => {
    setMessages({ ...messages, [userId]: value });
  }, [messages]);

  const [botTyping, setBotTyping] = useState(false);

    useEffect(() => {
      socket.on('connect', () => {
      });

      socket.on('disconnect', () => {
      });

      socket.on('bot-message', (msg) => {
        setBotTyping(false);
        setLatestMessage('Bot',msg);
      });

      socket.on('bot-typing', () => {
       setBotTyping(true);
      });

      socket.on('user-message', () => {

      });

      return () => {
        socket.off('connect');
        socket.off('disconnect');
        socket.off('bot-message');
        socket.off('bot-typing');
        socket.off('user-message');
      };
    }, []);

    const sendMessage = (msg) => {
      console.log("sending ", msg)
      setLatestMessage('User',msg);
      socket.emit("user-message", msg);
    }

  return (
    <LatestMessagesContext.Provider value={{ messages, setLatestMessage, botTyping, sendMessage }}>
      {children}
    </LatestMessagesContext.Provider>
  );
}
