import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";
import { useMessages } from "../../../hook/useMessages";
import "../styles/_messages.scss";

function Messages() {
  const { messageList, message, messageListElem, handleOnChange, handleSendMessage } =
    useMessages();

  return (
    <div className="messages">
      <Header />
      <div ref={messageListElem} className="messages__list" id="message-list">
        {messageList.map((data, index) => (
          <Message
            message={data.message}
            botTyping={data.botTyping}
            key={index}
          />
        ))}
        <div class="anchor"></div>
      </div>
      <Footer
        message={message}
        sendMessage={handleSendMessage}
        onChangeMessage={handleOnChange}
      />
    </div>
  );
}

export default Messages;
