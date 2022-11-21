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
    });

    socket.on("bot-message", (msg) => {
      setBotTyping(false);
      console.log("message: " + msg);
      setMessageList([
        ...messageList,
        {
          user: "bot",
          id: "id" + new Date().getTime(),
          message: msg,
        },
      ]);
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
    setMessageList([
      ...messageList,
      {
        user: "me",
        id: "id" + new Date().getTime(),
        message,
      },
    ]);
    setMessage("");
  };

  return (
    <div className="messages">
      <Header />
      <div className="messages__list" id="message-list">
        {
          messageList.map((data, index) => <Message message={data.message} key={index}/>)
        }
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
