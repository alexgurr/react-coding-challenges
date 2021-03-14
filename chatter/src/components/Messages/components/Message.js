import React from 'react';
import cx from 'classnames';

const ME = 'me';

export default function Message({ nextMessage, message, botTyping }) {
  return (
    <p
      className={cx(
        'messages__message',
        'animate__animated animate__rubberBand',
        {
          'messages__message--me': message.user === ME,
          'messages__message--last': (!nextMessage && (!botTyping || message.user === ME))
            || (nextMessage && nextMessage.user !== message.user)
        }
      )}
      key={message.id}
    >
      {message.message}
    </p>
  );
}
