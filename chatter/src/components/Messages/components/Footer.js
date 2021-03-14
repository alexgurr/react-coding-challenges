import React from 'react';

const RETURN_KEY_CODE = 13;

export default function Footer({ sendMessage, onChangeMessage, message }) {
  const onKeyDown = ({ keyCode }) => {
    if (keyCode !== RETURN_KEY_CODE ) { return; }

    sendMessage();
  }

  return (
    <div className="messages__footer">
      <input
        onKeyDown={onKeyDown}
        placeholder="Write a message..."
        id="user-message-input"
        onChange={onChangeMessage}
      />
      <div className="messages__footer__actions">
        <i className="far fa-smile" />
        <i className="fas fa-paperclip" />
        <i className="mdi mdi-ticket-outline" />
        <button onClick={sendMessage} disabled={!message}>Send</button>
      </div>
    </div>
  );
}
