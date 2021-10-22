import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import useSound from 'use-sound';
import initialBottyMessage from '../../../common/constants/initialBottyMessage';
import config from '../../../config';
import LatestMessagesContext from '../../../contexts/LatestMessages/LatestMessages';
import TypingMessage from './TypingMessage';
import Header from './Header';
import Footer from './Footer';
import Message from './Message';
import '../styles/_messages.scss';

const socket = io(
  config.BOT_SERVER_ENDPOINT,
  { transports: ['websocket', 'polling', 'flashsocket'] }
);

function Messages() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([{ user: 'bot', message: initialBottyMessage }]);
  const [isTyping, setIsTyping] = useState(false);
  const [playSend] = useSound(config.SEND_AUDIO_URL);
  const [playReceive] = useSound(config.RECEIVE_AUDIO_URL);
  const { setLatestMessage } = useContext(LatestMessagesContext);
  const chatEndRef = useRef(null);

  const onChangeMessage = useCallback((event) => {
    setMessage(event.target.value);
   }, []);

  const sendMessage = useCallback(() => {
    setMessage('');
    setChat([...chat, { user: 'me', message }]);
    playSend();
    socket.emit('user-message', message);
  }, [message]);

  const handleBotReply = useCallback((newMessage) => {
    setIsTyping(false);
    console.log(newMessage);
    setChat([...chat, { user: 'bot', message: newMessage }]);
    setLatestMessage('bot', newMessage);
    playReceive();
  }, [chat]);

  useEffect(() => {
    socket.on('bot-typing', () => setIsTyping(true));
  }, []);

  useEffect(() => {
    socket.on('bot-message', handleBotReply);
  }, [handleBotReply]);

  useEffect(() => {
    chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chat, isTyping]);

  return (
    <div className="messages">
      <Header />
      <div className="messages__list" id="message-list">
        {chat.map((message) => <Message message={message} />)}
        {isTyping && <TypingMessage />}
        <div ref={chatEndRef} />
      </div>
      <Footer message={message} sendMessage={sendMessage} onChangeMessage={onChangeMessage} />
    </div>
  );
}

export default Messages;
