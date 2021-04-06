import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import io from 'socket.io-client';
import useSound from 'use-sound';
import config from '../../../config';
import LatestMessagesContext from '../../../contexts/LatestMessages/LatestMessages';
import TypingMessage from './TypingMessage';
import Header from './Header';
import Footer from './Footer';
import Message from './Message';
import '../styles/_messages.scss';
import bottySocketEvents from '../constants/bottySocketEvents';
import userTypes from '../constants/userTypes';
import initialBottyMessage from '../../../common/constants/initialBottyMessage';

const socket = io(
  config.BOT_SERVER_ENDPOINT,
  { transports: ['websocket', 'polling', 'flashsocket'] }
);

function Messages() {
  const [playSend] = useSound(config.SEND_AUDIO_URL);
  const [playReceive] = useSound(config.RECEIVE_AUDIO_URL);
  const { setLatestMessage } = useContext(LatestMessagesContext);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef();

  useEffect(() => {
    //Next line could be deleted because setting initial message for 'bot' is already covered in initialMessages.js
    setLatestMessage('bot', initialBottyMessage);
    socket.on(bottySocketEvents.BOT_TYPING, () => {
      setIsTyping(true);
    });
  }, []);

  useEffect(() => {
    socket.on(bottySocketEvents.BOT_MESSAGE, (message) => {
      playReceive();
      setIsTyping(false);
      setMessages([...messages, { message, user: userTypes.BOT }]);
      setLatestMessage('bot', message);
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    });
  }, [messages])

  const sendMessage = () => {
    socket.emit(bottySocketEvents.USER_MESSAGE, message);
    setMessages([...messages, { message, user: userTypes.ME }]);
    setLatestMessage('bot', message);
    setMessage('');
    playSend();
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const changeMessage = (e) => {
    setMessage(e.target.value);
  }
  const getMessages = useCallback(
    () => (
      messages.map((messageObject, id) => (
        <Message
          key={id}
          nextMessage={messages[id + 1]}
          message={{ ...messageObject, id }}
          botTyping={isTyping}
        />
      ))
    ),
    [messages],
  );

  return (
    <div className="messages">
      <Header />
      <div className="messages__list" id="message-list">
        {getMessages()}
        <div ref={messagesEndRef} />
      </div>
      {isTyping && <TypingMessage />}
      <Footer message={message} sendMessage={sendMessage} onChangeMessage={changeMessage} />
    </div>
  );
}

export default Messages;
