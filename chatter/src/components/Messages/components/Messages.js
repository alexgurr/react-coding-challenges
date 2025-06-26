import React, { useContext, useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import useSound from 'use-sound';
import config from '../../../config';
import LatestMessagesContext from '../../../contexts/LatestMessages/LatestMessages';
import TypingMessage from './TypingMessage';
import Header from './Header';
import Footer from './Footer';
import Message from './Message';
import '../styles/_messages.scss';
import initialBottyMessage from '../../../common/constants/initialBottyMessage';

const socket = io(config.BOT_SERVER_ENDPOINT, {
  transports: ['websocket', 'polling', 'flashsocket']
});

const Messages = () => {
  const { setLatestMessage } = useContext(LatestMessagesContext);
  const [messages] = useState([{ message: initialBottyMessage, user: 'bot' }]);
  const [messageText, setMessageText] = useState('');
  const [displayError, setDisplayError] = useState({ isVisible: false, message: '' });
  const [displayTyping, setDisplayTyping] = useState(false);
  const [playSend] = useSound(config.SEND_AUDIO_URL);
  const [playReceive] = useSound(config.RECEIVE_AUDIO_URL);
  const refVal = useRef(null);

  const sendMessage = () => {
    const newMessage = { message: messageText, user: 'me' };
    messages.push(newMessage);
    socket.emit('user-message', newMessage.message);
    setLatestMessage(newMessage.message);
    playSend();
    setMessageText('');
  };

  const handleNewMessage = (newBotMessage) => {
    playReceive();
    setLatestMessage(newBotMessage);
    messages.push({ message: newBotMessage, user: 'bot' });
    setDisplayTyping(false);
  };

  const handleBotTyping = () => setDisplayTyping(true);

  const scrollToLastMessage = () => {
    refVal.current?.scrollIntoView();
  };

  const displayMessages = () => messages.map((item, index) => (
    <Message key={index} message={item} nextMessage={messages[index + 1]} botTyping={displayTyping} />
  ));

  const displayErrorText = () => displayError.isVisible && <p>{displayError.message}</p>;

  useEffect(() => {
    socket.on('bot-message', handleNewMessage);
    socket.on('bot-typing', handleBotTyping);

    const errorEvents = ['connect_error', 'disconnect', 'reconnect_error', 'error', 'connect_timeout'];

    socket.on('connect_error', (error) => {
      setDisplayError({isVisible: true, message: "There was an error connecting."})
    });
    socket.on('disconnect', (reason) => {
      setDisplayError({isVisible: true, message: "There was an error. Disconnected from Botty."})
    });
    socket.on('reconnect_error', (error) => {
      setDisplayError({isVisible: true, message: "There was an error reconnecting."})
    });
    socket.on('error', (error) => {
      setDisplayError({isVisible: true, message: "There was an error. Please refresh and try again."})
    });
    socket.on('connect_timeout', (timeout) => {
      setDisplayError({isVisible: true, message: "There was an error, connection timed out."})
    });

    scrollToLastMessage();

    return () => {
      socket.off('bot-message', handleNewMessage);
      socket.off('bot-typing', handleBotTyping);
      errorEvents.forEach(event => socket.off(event));
    };
  }, []);

  return (
    <div className="messages">
      <Header />
      <div className="messages__list" id="message-list">
        { displayMessages() }
        { displayTyping && <TypingMessage /> }
        { displayErrorText() }
        <div ref={refVal} />
      </div>
      {!displayError.isVisible && (
        <Footer message={messageText} sendMessage={sendMessage} onChangeMessage={(e) => setMessageText(e.target.value)} />
      )}
    </div>
  );
};

export default Messages;