import React, { useCallback, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import useSound from "use-sound";
import config from "../../../config";
import LatestMessagesContext from "../../../contexts/LatestMessages/LatestMessages";
import TypingMessage from "./TypingMessage";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";
import "../styles/_messages.scss";

const socket = io(config.BOT_SERVER_ENDPOINT, {
  transports: ["websocket", "polling", "flashsocket"],
});

function Messages() {
  const [playSend] = useSound(config.SEND_AUDIO_URL);
  const [playReceive] = useSound(config.RECEIVE_AUDIO_URL);
  const { setLatestMessage } = useContext(LatestMessagesContext);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [botTyping, setBotTyping] = useState(false);

  useEffect(() => {
    socket.on("bot-typing", () => {
      setBotTyping(true);
      setMessageList([
        ...messageList,
        {
          message: {
            user: "bot",
            id: "id" + new Date().getTime(),
            message: null,
          },
          botTyping: true
        },
      ]);
    });

    socket.on("bot-message", (msg) => {
      playReceive();
      setBotTyping(false);
      setMessageList([
        ...messageList,
        {
          message: {
            user: "bot",
            id: "id" + new Date().getTime(),
            message: msg,
          },
          botTyping: false,
          nextMessage: {
            user: "bot"
          }
        },
      ]);

      setLatestMessage("charles", msg);
    });
  }, []);

  // handle user input
  const handleOnChange = useCallback(
    (e) => {
      const value = e.target.value;
      setMessage(value);
    },
    [message]
  );

  // handle send message
  const handleSendMessage = () => {
    socket.emit("user-message", message);
    playSend();
    setMessageList([
      ...messageList,
      {
        message: {
          user: "me",
          id: "id" + new Date().getTime(),
          message,
        },
        botTyping: false,
        nextMessage: {
          user: "me"
        }
      },
    ]);
    setLatestMessage("charles", message);
    setMessage("");
  };

  return (
    <div className="messages">
      <Header />
      <div className="messages__list" id="message-list">
        {messageList.map((data, index) => (
          <Message
            message={data.message}
            botTyping={data.botTyping}
            key={index}
          />
        ))}
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
