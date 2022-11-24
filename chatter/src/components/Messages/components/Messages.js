import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import useSound from 'use-sound';
import config from '../../../config';
import LatestMessagesContext from '../../../contexts/LatestMessages/LatestMessages';
import TypingMessage from './TypingMessage';
import Header from './Header';
import Footer from './Footer';
import Message from './Message';
import '../styles/_messages.scss';


function Messages() {
  const [playSend] = useSound(config.SEND_AUDIO_URL);
  const [playReceive] = useSound(config.RECEIVE_AUDIO_URL);
  const { messages, botTyping, sendMessage } = useContext(LatestMessagesContext);

  const [message, setMessage] = useState('');

  return (
    <div className="messages">
      <Header />
      <div className="messages__list" id="message-list">
        <div>
          {Object.entries(messages)?.map(([key, msg]) =>
            <Message nextMessage={message} message={{user: key, message: msg, id: key}} botTyping={botTyping}/>
          )}
        </div>
      </div>
      <Footer message={message} sendMessage={sendMessage} onChangeMessage={(e) => {setMessage(e.target.value)}} />
    </div>
  );
}

export default Messages;
